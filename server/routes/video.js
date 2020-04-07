const express = require('express');
const router = express.Router();
const {Video} = require("../models/Video");

const {auth} = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

//STORAGE MULTER CONFIG
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})
var upload = multer({storage: storage}).single("file");

router.post('/uploadfiles', (req, res) => {
    //비디오를 서버에 저장
    upload(req, res, err => {
        if (err) {
            return res.json({success: false, err})
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename})
        //file을 업로드하면 그 경로를 보내주는 것
    })
});

router.post('/uploadVideo', (req, res) => {
    //비디오를 서버에 저장
    const video = new Video(req.body)
    //mongodb method로 save
    video.save((err, video) => {
        if (err) 
            return res.status(400).json({success: false, err})
        return
        res
            .status(200)
            .json({success: true})
    })
});

//썸네일 생성
router.post('/thumbnail', (req, res) => {
    //썸네일 생성, 비디오 러닝타임

    let filePath = ""
    let fileDuration = ""
    //비디오 정보
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.log(metadata); //all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    });

    //썸네일 생성
    ffmpeg(req.body.url) //저장 경로 (uploads 폴더)
    //video thumbnail 파일이름 생성
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)
            filePath = "uploads/thumbnails/" + filenames[0];
        })
        //썸네일 생성 후 무엇을 할 것인지
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({success: true, url: filePath, fileDuration: fileDuration});
        })
        //스크린 샷 옵션
        .screenshots({
            //Will take screenshots at 20%, 40%, 60$ and 80% of the video
            count: 3, //3개의 스크린 샷
            folder: 'uploads/thumbnails', //썸네일 저장 폴더
            size: '320x240', //썸네일 사이즈
            //'%b': input basename (filename w/p extension)
            filename: 'thumbnail-%b.png' //썸네일- 파일 기본 이름
        })
})

module.exports = router;
