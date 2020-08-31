import React from "react";
import { timeConverter } from "../../../utils/convertTime";
import { connect } from "react-redux";
import { Progress, Icon, Tooltip, Modal, notification, Empty } from "antd";
import { LiCopy } from './../../layout/common/Common';
import { TYPE } from './../../../const/type';
import ModalImage from "react-modal-image";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { sendFileHeader } from './../../../services/auth';
import axios from 'axios';

function GetDate(dateRaw) {
  var date = new Date(dateRaw);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

const pixelRatio = 4;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

function ShortProfile(props?: { personalInfo?: any }) {
  const [personalInfo, setPersonalInfo] = React.useState(null);
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [coverUrl, setCoverUrl] = React.useState(null);
  let [visible, onSetVisible] = React.useState(false);
  const [crop, setCrop] = React.useState({ unit: "%", width: 30, aspect: 1 / 1 });
  const [imgCropUrl, setImgCropUrl] = React.useState(props.personalInfo.avatarUrl);
  const imgRef = React.useRef(null);
  const [typeImg, setTypeImage] = React.useState("");
  const previewCanvasRef = React.useRef(null);
  const [completedCrop, setCompletedCrop] = React.useState(null);
  const [percent, setPercent] = React.useState(0);

  const onChangeFile = React.useCallback((file) => {
    let fileReader = new FileReader();
    // Read file image
    fileReader.onload = function (e) {
      setImgCropUrl(e.target.result);
    };
    fileReader.readAsDataURL(file);
  }, []);

  const onLoad = React.useCallback(img => {
    imgRef.current = img;
  }, []);

  React.useEffect(() => {
    let { personalInfo } = props;
    setCoverUrl(personalInfo.coverUrl);
    setAvatarUrl(personalInfo.avatarUrl);
    setPersonalInfo(props.personalInfo);
  }, [props])

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  function generateDownload(previewCanvas, crop) {
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
    canvas.toBlob(
      blob => {
        // const previewUrl = window.URL.createObjectURL(blob);
        // uploadFiles(blob);
        uploadFiles(blob);
        // const anchor = document.createElement("a");
        // anchor.download = "cropPreview.png";
        // anchor.href = URL.createObjectURL(blob);
        // anchor.click();
        // console.log(blob);
        // window.URL.revokeObjectURL(previewUrl);
      },
      "image/png",
      1
    );

  }

  const uploadFiles = async (file) => {
    if (!file) {
      notification.warning({ message: "Cần chọn file", description: "Bạn có cần chọn file để cập nhật" })

    } else {
      const formData = new FormData();
      formData.append(typeImg, file);
      axios.put(
        process.env.REACT_APP_API_HOST + `/api/students/${typeImg}`,
        formData,
        {
          headers: sendFileHeader,
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            setPercent(uploadPercentage)
          },
        }).then((res) => {
          if (res) {
            notification.success({ message: 'Thành công', description: "Bạn đã  cập nhật ảnh thành công" });
            setPercent(0);
            if (TYPE.AVATAR === typeImg) {
              setAvatarUrl(res.data.data.avatarUrl)
            } else
            setCoverUrl(res.data.data.coverUrl)
          }
        }).catch((err) => {
          if (err) {
            notification.warning({ message: "Lỗi bất ngờ", description: " Thử làm lại xem sao" })
          }
        }).finally(() => {
          setTimeout(() => {
            onSetVisible(false);
          }, 1000);
        })
    }
  }

  return (
    <div className="wrapper" id="person">
      <Modal
        title={typeImg === TYPE.AVATAR ? "Thay đổi ảnh đại diện" : "Thay đổi ảnh bìa"}
        visible={visible}
        onCancel={() => onSetVisible(false)}
        onOk={() => generateDownload(previewCanvasRef.current, completedCrop)}
        destroyOnClose={true}
        confirmLoading={percent !== 0}
        okText="Cập nhật"
        cancelText={"Hủy"}
        children={
          <form>
            <input
              id={"img-set"}
              type='file'
              accept=".jpg,.png"
              style={{margin: 10}}
              onChange={
                event => onChangeFile(event.target.files[0])
              }
            />
            <Progress size="small" percent={percent && parseInt(percent.toString())} />
            <div
              className={"test"}
              style={{
                height: 300,
                overflowX: "auto",
                marginTop: 5
              }}
            >
              {
                !imgCropUrl ?
                  <label
                    htmlFor={"img-set"}
                    style={{
                      padding: 20,
                      width: "100%",
                      margin: 0
                    }}
                  >
                    <Empty
                      description={<b>Nhấp vào để thêm ảnh</b>}
                    />
                  </label>
                  :
                  <ReactCrop
                    src={imgCropUrl}
                    onImageLoaded={onLoad}
                    crop={{ ...crop, aspect: TYPE.AVATAR === typeImg ? 1 / 1 : 16 / 9 }}
                    onChange={c => setCrop(c)}
                    onComplete={c => setCompletedCrop(c)}
                  />
              }
            </div>
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: completedCrop ? completedCrop.width : 0,
                  height: completedCrop ? completedCrop.height : 0,
                  display: 'none'
                }}
              />
            </div>
          </form>
        }
      />
      <div className="avatar">
        <div className="cover-url">
          <div
            style={{
              height: "25vh",
              width: "100%",
              marginBottom: "10px",
              borderRadius: "2px"
            }}
            className="small-image"
          >
            <ModalImage
              small={
                coverUrl ?
                  coverUrl :
                  TYPE.DEFAULT_IMAGE}
              large={
                coverUrl ?
                  coverUrl :
                  TYPE.DEFAULT_IMAGE}
            />
          </div>
        </div>
        <div className="img-modal-show">
          <ModalImage
            small={!avatarUrl ? TYPE.DEFAULT_IMAGE : avatarUrl}
            large={!avatarUrl ? TYPE.DEFAULT_IMAGE : avatarUrl}
          />
          
        </div>
      </div>
      <Tooltip title="Cập nhật ảnh đại diện" placement={"right"}>
        <div
          className="up-avatar-image"
          onClick={() => {
            setTypeImage(TYPE.AVATAR)
            onSetVisible(true);
          }}
        >
          <Icon type="camera" theme="filled" />
        </div>
      </Tooltip>
      <div
        className="up-cover-image"
        onClick={() => {
          setTypeImage(TYPE.COVER)
          onSetVisible(true)
        }}
      >
        <Icon type="camera" theme="filled" />
        <b>Thay đổi ảnh bìa</b>
      </div>
      <div className="short-profile">
        <ul>
          {/* <LiCopy show={true}>
            <Icon type="user" />
            Họ và tên:{" "}
            {personalInfo &&
              personalInfo.lastName + " " + personalInfo.firstName}
          </LiCopy > */}
          <li className="profile-info" style={{fontSize: '1.9em', fontWeight: 'bold', marginBottom: 10}}>{personalInfo &&
              personalInfo.lastName + " " + personalInfo.firstName}</li>
          <LiCopy >
            <Icon type="share-alt" />
            Trạng thái:
            {personalInfo && personalInfo.isLookingForJob === true
              ? <b> Đang tìm việc</b>
              : <b> Đã có công việc</b>}
          </LiCopy>
          <LiCopy >
            <Icon type="reconciliation" />
            Ngày sinh:{" "}
            {personalInfo && personalInfo.birthday !== -1 ? timeConverter(personalInfo && personalInfo.birthday): '_'}
          </LiCopy>
          <LiCopy >
            <Icon type={personalInfo && personalInfo.gender === "MALE" ? "man" : "woman"} />
            Giới tính:{" "}
            {personalInfo && personalInfo.gender === "MALE" ? "Nam" : "Nữ"}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.addres}>
            <Icon type="environment" />
            Địa chỉ:{" "} {personalInfo && personalInfo.address ? personalInfo.address : "_"}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.email}>
            <Icon type="mail" />
            Email:{" "}{personalInfo && personalInfo.email}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.phone}>
            <Icon type="phone" />
            Điện thoại liên hệ:{" "}{personalInfo && personalInfo.phone ? personalInfo.phone : '_'}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.identityCard}>
            <Icon type="idcard" />
            Số CMND:{personalInfo && personalInfo.identityCard ? personalInfo.identityCard : '_'}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.studentCode}>
            <Icon type="idcard" />
            Mã sinh viên :{" "}{personalInfo && personalInfo.studentCode ? personalInfo.studentCode : '_'}
          </LiCopy>
          <LiCopy >
            <Icon type="database" />
            Ngày tạo:{" "}{personalInfo && GetDate(personalInfo.createdDate)}
          </LiCopy>
          <LiCopy >
            <Icon type="safety" />
            Hoàn thiện hồ sơ:{" "}{personalInfo && personalInfo.completePercent} %
            <Progress percent={personalInfo ? personalInfo.completePercent : 0} />
          </LiCopy>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  personalInfo: state.FullPersonalInfo.personalInfo,
});

export default connect(mapStateToProps, null)(ShortProfile);
