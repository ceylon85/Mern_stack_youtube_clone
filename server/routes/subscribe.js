const express = require('express');
const router = express.Router();
const {Subscriber} = require("../models/Subscriber");

//이 유저를 얼마나 구독하는가?
router.post('/subscribeNumber', (req, res) => {

    Subscriber
        .find({'userTo': req.body.userTo})
        .exec((err, subscribe) => {
            if (err) 
                return res.status(400).send(err)
            res
                .status(200)
                .json({success: true, subscribeNumber: subscribe.length})

        })
});
//내가 구독한 구독자
router.post('/subscribed', (req, res) => {
    // userTo 와 userFrom 둘다 값을 가지고 있으면 내가 이사람을 구독하고 있다 subscribe.length 가 값이 있다면 구독
    // 없으면 구독x
    Subscriber
        .find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, subscribe) => {
            if (err) 
                return res.status(400).send(err)

            let result = false;
            if (subscribe.length !== 0) {
                result = true
            }
            res
                .status(200)
                .json({success: true, subscribed: result})

        });
});
//구독 취소하기
router.post('/unsubscribe', (req, res) => {
    //findOneAndDelete 찾아서 삭제
    Subscriber
        .findOneAndDelete({userTo: req.body.userTo, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) 
                return res.status(400).json({success: false, err});
            res
                .status(200)
                .json({success: true, doc})

        })
});

//구독하기
router.post('/subscribe', (req, res) => {
    //DB에 userTo와 userFrom 을 저장 인스턴스 생성해서 정보를 불러온다
    const subscribe = new Subscriber(req.body);
    // 불러온 정보를 저장
    subscribe.save((err, doc) => {
        if (err) 
            return res.json({success: false, err})
        res
            .status(200)
            .json({success: true})
    })
});

module.exports = router;
