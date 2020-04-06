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
        value: 1,
        label: "Autos & Vehicles"
    }, {
        value: 2,
        label: "Music"
    }, {
        value: 3,
        label: "Pets & Animals"
    }
]

function VideoUploadPage() {
    const [VideoTitle,
        setVideoTitle] = useState("")
    const [Description,
        setDescription] = useState("")
    const [Private,
        setPrivate] = useState(0)
    const [Category,
        setCategory] = useState("Film & Animation")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryCahnge = (e) => {
        setCategory(e.currentTarget.value)
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
            <Form onSubmit>
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {/* Drop Zone */}
                    <Dropzone onDrop multiple maxSize>
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
                    <div>
                        <img src alt/>
                    </div>
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

                <select onChange={onPrivateChange}>
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
                <Button type="danger" size="large" onClick>
                    Submit</Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
