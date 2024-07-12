let express = require("express");
let route = express.Router();


app.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.send('Hello, Admin!');
});

/* --------------------------------- create --------------------------------- */
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = new mongoose.model('User')({ username, password, role });
        await user.save();
        res.send('User registered successfully');
    } catch (err) {
        res.status(400).send(err);
    }
});

/* ---------------------------- User login route ---------------------------- */
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await mongoose.model('User').findOne({ username });
        if (!user) return res.status(400).send('Username or password is wrong');

        const validPass = await user.comparePassword(password);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id, role: user.role }, 'SECRET');
        res.cookie('token', token, { httpOnly: true });
        res.send('Logged in successfully');
    } catch (err) {
        res.status(400).send(err);
    }
});


/* ---------------------------- User logout route --------------------------- */
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out successfully');
});