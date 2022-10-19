const { IgApiClient } = require('instagram-private-api')
const express = require('express')
const router = express.Router()
const ig = new IgApiClient()

router.post('/', async (req, res) => {
    const {username, password} = req.body
    let ols = ''
    ig.state.generateDevice(username)
    try {
        await ig.account.login(username, password)
        const cooki = await ig.state.serializeCookieJar()
        const simpankuki = cooki.cookies
        simpankuki.forEach((v, i) => {
            ue = i == simpankuki.length - 1;
            if(ue){
                ols += v.key + '=' + v.value
            }else {
                ols += v.key + '=' + v.value + '; '
            }
        })
        res.status(200).json({cookie : ols})
    } catch (e) {
        res.status(e.statusCode || 400).json({'status': e.message});
    }
});

module.exports = router