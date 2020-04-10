import React, {useState} from 'react'
import {Typography, Button, Form, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import {useSelector} from "react-redux";

const {Title} = Typography;
const {TextArea} = Input;

const PrivateOptions = [
    {
        value: 0,
        label: 'Private'
    }, {
        value: 1,
        label: 'Public'
    }
]

const CategoryOptions = [
    {
        value: 0,
        label: "Film & Animation"
    }, {
        value: 0,
        label: "Autos & Vehicles"
    }, {
        value: 0,
        label: "Music"
    }, {
        value: 0,
        label: "Pets & Animals"
    }, {
        value: 0,
        label: "Sports"
    }
]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);

    const [VideoTitle,
        setVideoTitle] = useState("")
    const [Description,
        setDescription] = useState("")
    const [Privacy,
        setPrivacy] = useState(0)
    const [Categories,
        setCategories] = useState("Film & Animation")
    const [FilePath,
        setFilePath] = useState("")
    const [Duration,
        setDuration] = useState("")
    const [Thumbnail,
        setThumbnail] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivacyChange = (e) => {
        setPrivacy(e.currentTarget.value)
    }

    const onCategoryCahnge = (e) => {
        setCategories(e.currentTarget.value)
    }

    const onSubmit = (e) => {

        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('로그인 먼저 해주세요')
        }

        if (VideoTitle === "" || Description === "" || Categories === "" || FilePath === "" || Duration === "" || Thumbnail === "") {
            return alert('빈칸 없이 채워주세요.')
        }

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }
        //variables 를 가지고 request를 보냄
        Axios
            .post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('업로드에 성공!')

                    props
                        .history
                        .push('/');

                } else {
                    alert('비디오 업로드에 실패')
                }
            })

    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        formData.append("file", files[0])

        Axios
            .post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    //gerenate thumbnail with this filepath !

                    Axios
                        .post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)
                            } else {
                                alert('썸네일 생성에 실패했습니다.');
                            }
                        })

                } else {
                    alert('비디오 저장에 실패했습니다')
                }
            })

    }

    return (
        <div
            style={{
            maxWidth: '700px',
            margin: '2rem auto'
        }}>
            <div
                style={{
                textAlign: 'center',
                marginBottom: '2rem'
            }}>
                <Title level={2}>
                    Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                        {({getRootProps, getInputProps}) => (
                            <div
                                style={{
                                width: '300px',
                                height: '240px',
                                border: '1px solid lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <Icon
                                    type="plus"
                                    style={{
                                    fontSize: '3rem'
                                }}/>

                            </div>
                        )}
                    </Dropzone>

                    {Thumbnail !== "" && <div>
                        <img src={`http://localhost:5000/${Thumbnail}`} alt="haha"/>
                    </div>
}
                </div>

                <br/><br/>
                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle}/>
                <br/><br/>
                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description}/>
                <br/><br/>

                <select onChange={onPrivacyChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/><br/>

                <select onChange={onCategoryCahnge}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br/><br/>

                <Button type="danger" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default VideoUploadPage