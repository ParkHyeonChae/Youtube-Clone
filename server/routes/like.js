const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


//=================================
//            Like
//=================================


router.post('/getLikes', (req, res) => {
   
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.stauts(400).send(err)
            res.status(200).json({ success: true, likes })
        })

});


router.post('/getDislikes', (req, res) => {
   
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.stauts(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })

});


router.post('/upLike', (req, res) => {
   
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    // Like collection에다 클릭 정보를 넣어줌
    const like = new Like(variable)

    like.save((err, likeResult) => {
        if(err) return res.json({ success: false, err })

        // Dislike이 이미 클릭 되있다면, Dislike를 1 줄여줌
        Dislike.findByIdAndDelete(variable)
            .exec((err, disLikeResult) => {
                if(err) return res.json({ success: false, err })
                res.status(200).json({ success: true })
            })
    })
    
});


router.post('/unLike', (req, res) => {
   
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.findByIdAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

});


module.exports = router;