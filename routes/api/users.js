const express = require('express');
const router = express.Router();
// @route api/users/test
// @ desc Tests users route
// @ access private
router.get('/test', (req, res) => {
    res.json({
        msg: "Users working"
    });
});

module.exports = router;