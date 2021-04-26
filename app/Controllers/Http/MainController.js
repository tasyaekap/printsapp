'use strict'
const fetch = require('node-fetch');


class MainController {
    async trackAwb({ params, response, view }) {
        const respon = await fetch(`http://202.138.229.86/tics/api/data/awbdata/` + params.id, {
            headers: { 'x-token': '00043eb6617434cc5f357bbf692e53b3' }
        })
        const body = await respon.json()

        var a = body[0]

        for (var i in a) {
            if (a.trnConsAlm1.length == 0) {
                var b = a.trnConsName + ", " + a.trnConsCity
            } else if (a.trnConsAlm2.length == 0) {
                var b = a.trnConsName + ", " + a.trnConsAlm1 + ", " + a.trnConsCity
            } else if (a.trnConsAlm3.length == 0) {
                var b = a.trnConsName + ", " + a.trnConsAlm1 + ", " + a.trnConsAlm2 + ", " + a.trnConsCity
            } else {
                var b = a.trnConsName + ", " + a.trnConsAlm1 + ", " + a.trnConsAlm2 + ", " + a.trnConsAlm3 + ", " + a.trnConsCity
            }

            a.qr = a.trnConsName + ", " + a.trnConsAlm1 + ", " + a.trnConsCity
        }

        return view.render('resi', { a })
    }
}

module.exports = MainController