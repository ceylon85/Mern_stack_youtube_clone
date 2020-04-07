import React, {useState} from 'react';
import {
    Typography,
    Button,
    Form,
    message,
    Input,
    Icon
} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector} from 'react-redux';

const {TextArea} = Input;
const {Title} = Typography;

const PrivateOptions = [
    {
        value: 0,
        label: "Private"
    }, {
        value: 1,
        label: "Public"
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
    },
]

function VideoUploadPage() {
    const user = useSelector(state => state.user);
    const [VideoTitle,
        setVideoTitle] = useState("")
    const [Description,
        setDescription] = useState("")
    const [Privacy,
        setPrivacy] = useState(0)
    const [Category,
        setCategory] = useState("Film & Animation")
    const [FilePath,
        setFilePath] = useState("")
    const [Duration,
        setDuration] = useState("")
    const [ThumbnailPath,
        setThumbnailPath] = useState("")

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
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        formData.append('file', files[0])

        Axios
            .post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url)

                    Axios
                        .post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)
                            } else {
                                alert('썸네일 생성에 실패!')
                            }
                        })
                } else {
                    alert('비디오 업로드 실패!')
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: VideoTitle ,
            description: Description,
            privacy: Privacy,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath 
        }
        //variables 를 가지고 request를 보냄
        Axios.post('/api/video/uploadVideo', variables)
        .then(response => {
            if(response.data.success){

            }else {
                alert('비디오 업로드에 실패 ')
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
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {/* Drop Zone */}
                    <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
                        {({getRootProps, getInputProps}) => (
                            <div
                                style={{
                                display: 'flex',
                                width: '300px',
                                height: '240px',
                                border: '1px solid lightgray',
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

                    {/* Thumbnail */}
                    {ThumbnailPath && <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt='thumbnail'/>
                    </div>
}
                </div>
                <br/>
                <br/>

                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle}/>
                <br/>
                <br/>

                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description}/>
                <br/>
                <br/>

                <select onChange={onPrivacyChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>

                <select onChange={onCategoryCahnge}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>

                <Button type="danger" size="large" onClick={onSubmit}>
                    Submit</Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
