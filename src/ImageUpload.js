import React, { useState } from 'react'
import './ImageUpload.css';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import { storage, db } from "./firebase.js";
import { useHistory } from "react-router-dom";
import './ImageUpload.css';
import firebase from "firebase";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        height: 343,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #DDDFE2',
        outline: 'none',
        boxShadow: theme.shadows[5],
        borderRadius: '5px',
    },
}));

function ImageUpload({ username }) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [noLikes, setNoLikes] = useState(0);
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const uploadFileWithClick = () => {
        document.getElementsByClassName('imageFile')[0].click()
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleUpload = (event) => {
        event.preventDefault()

        if (image == '') {
            db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: image,
                noLikes: noLikes,
                username: username
            })
        } else {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            db.collection("posts").add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                noLikes: noLikes,
                                username: username
                            });
                            handleClose();
                            setProgress(0);
                            setCaption("")
                            setImage(null);
                        })
                }
            )
        }
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        <div className="imageupload">
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="imageupload__commentAssign">
                        <div className="imageupload__firstSectionModal">
                            <h3>Create Post</h3>
                        </div>
                        <div className="imageupload__secondSectionModal">
                            <Avatar
                                className="imageupload__avatar"
                                alt=""
                            />
                            <input type="text" onChange={(e) => setCaption(e.target.value)} onClick={handleOpen} placeholder={`What's on your mind ${username} ?`} />
                        </div>
                        <hr />
                        <div className="imageupload__imageuploadModal" onClick={uploadFileWithClick}>
                            <img src="https://image.flaticon.com/icons/svg/3233/3233027.svg" className="imageupload__gallery" alt=""></img>
                            <input type="file" className="imageFile" onChange={handleChange} />
                            <h3>Photo</h3>
                        </div>
                        <br />
                        <div className="imageupload__feedModal">
                            <label class="containerr">
                                <input type="checkbox" checked />
                                <span class="checkmark"></span>
                            </label>
                            <div class="imageupload__colorwrap1">
                                <img src="https://www.flaticon.com/premium-icon/icons/svg/1674/1674711.svg" className="imageupload__newsFeed" />
                            </div>
                            <h3>News Feed</h3>
                            <br />
                            <h2 className={`imageText ${image && 'show'}`}>Image is added and will be displayed after clicking the Post button</h2>
                            <Button type="submit" onClick={handleUpload} className="imageupload__submitButton">Post</Button>
                        </div>
                    </form>
                </div>
            </Modal>

            <div className="imageupload__container">
                <div className="imageupload__firstSection">
                    <h3>Create Post</h3>
                </div>

                <div className="imageupload__secondSection">
                    <Avatar
                        className="imageupload__avatar"
                        alt=""
                    />
                    <input type="text" onClick={handleOpen} placeholder={`What's on your mind ${username} ?`} />
                </div>
                <hr />
                <div className="uploadimage__options" onClick={setOpen}>
                    <div className="imageupload__imageupload">
                        <img src="https://image.flaticon.com/icons/svg/3233/3233027.svg" className="imageupload__gallery" alt=""></img>
                        <h3>Photo</h3>
                    </div>
                    <div className="imageupload__more">

                        <img src="https://image.flaticon.com/icons/svg/860/860760.svg" className="imageupload__dots" alt="" />
                    </div>
                </div>
                <progress value={progress} max="100" className={`progress ${progress && 'show'}`} />
            </div>
        </div>
    )
}

export default ImageUpload
