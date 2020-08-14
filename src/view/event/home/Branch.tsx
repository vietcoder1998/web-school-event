import React, { PureComponent } from "react";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { PUBLIC_HOST } from "../../../environment/development";
// import { EVENT_PUBLIC } from "../../../services/api/public.api";
import { _get } from "../../../services/base-api";
import { REDUX_SAGA } from "../../../const/actions";
import whileImage from '../../../assets/image/while.png';
import img_circuit from '../../../assets/image/event/circuit.jpg'
import img_tech from '../../../assets/image/event/tech.jpg'
import img_business from '../../../assets/image/event/business.jpg'


interface IProps {
  getEvenJob?: Function;
  listBranch?: any;
  eventID?: any;
  schoolID?: any
}
interface IState {
  listBranch: any;
  is_loading: boolean;
  heightTech: number;
  heightBusiness: number;
  width: number
}


class Branch extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listBranch: [],
      is_loading: true,
      heightTech: 0,
      heightBusiness: 0,
      width: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    // this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount = async () => {
    await this.setState({ is_loading: false });
    let listBranch = await _get(null, `/api/schools/events/${this.props.eventID}/jobs/branches`, PUBLIC_HOST, {});
    this.setState({
      listBranch: listBranch.data,
    });
    localStorage.removeItem("e_bid");
    localStorage.setItem('branch_name', "VIỆC LÀM TRONG NGÀY HỘI");

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
    // window.addEventListener('load', this.updateWindowDimensions);
    // console.log(localStorage.getItem('branch_name'))
  };
  updateWindowDimensions() {
    const width = window.innerWidth
    // 556 is width image, 451.5 is height image 2, 411 is height image 3
    const offset = ((width - width * 10 / 100) / 2 - 20) / 556 * (451.5 - 411)
    // console.log(offset )
    this.setState({ width: offset });
  }


  handleClick = (id, name) => {
    localStorage.setItem("e_bid", id);
    localStorage.setItem('branch_name', "VIỆC LÀM NHÓM NGÀNH " + name);
    let pageHeight = 0;
    (function () {
      function findHighestNode(nodesList) {
        for (let i = nodesList.length - 1; i >= 0; i--) {
          if (nodesList[i].scrollHeight && nodesList[i].clientHeight) {
            var elHeight = Math.max(nodesList[i].scrollHeight, nodesList[i].clientHeight);
            pageHeight = Math.max(elHeight, pageHeight);
          }
          if (nodesList[i].childNodes.length) findHighestNode(nodesList[i].childNodes);
        }
      }
      findHighestNode(document.documentElement.childNodes);
    })();
    window.scrollTo({
      top: pageHeight - pageHeight / 2 + 200,
      behavior: 'smooth'
    });
    this.props.getEvenJob(0);
  };


  render() {
    let { listBranch } = this.state;
    let electromechanical = { id: null, name: null, imageUrl: null }
    let technique = { id: null, name: null, imageUrl: null }
    let business = { id: null, name: null, imageUrl: null }
    if (listBranch && listBranch.items) {
      electromechanical = listBranch.items.find(item => item.id === 21)
      technique = listBranch.items.find(item => item.id === 13)
      business = listBranch.items.find(item => item.id === 2)
    }
    return (
      <div
        className="top-branch"
        style={{ backgroundColor: "#F9FBFF !important", padding: "3% 5%" }}
      >
        <h5 style={{ textAlign: "center", }}>GIAN HÀNG NGÀY HỘI THEO NGÀNH NGHỀ</h5>
        <Row type='flex'>
          {listBranch && listBranch.items && (
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={8}>
              <div className="branch-item" style={{ textAlign: "center", padding: 0 }}>
                <a
                  onClick={() => {
                    this.handleClick(electromechanical.id, electromechanical.name);
                  }}
                >
                  <div className='border-image-branch'>
                    <img
                      src={img_circuit}
                      alt="branch"
                      width="100%"
                      height="100%"
                      style={{ borderTopLeftRadius: '10.4528px', borderTopRightRadius: '10.4528px' }}
                    />
                  </div>
                  {electromechanical ? 
                  <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 106.5 - this.state.width }}>
                    <img
                      src={ electromechanical.imageUrl === null ? whileImage : electromechanical.imageUrl}
                      alt="branch"
                      style={{ width: 30, marginRight: 10 }}
                    />
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{electromechanical.name}{" "}</div>
                  </div> : null }
                </a>
              </div>
            </Col>
          )}
          {listBranch && listBranch.items && (
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={8} >
              <div className="branch-item" style={{ textAlign: "center", padding: 0 }} >
                <a
                  onClick={() => {
                    this.handleClick(technique.id, technique.name);
                  }}
                >
                  <div className='border-image-branch'>
                    {/* <img
              src={listBranch.items[0].imageUrl === null ? whileImage : listBranch.items[0].imageUrl}
              alt="branch"
              
            /> */}
                    <img
                      src={img_tech}
                      alt="branch"
                      width="100%"
                      height="100%"
                      style={{ borderTopLeftRadius: '10.4528px', borderTopRightRadius: '10.4528px' }}
                    />
                  </div>
                {technique ? 
                  <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      src={technique.imageUrl === null ? whileImage : technique.imageUrl}
                      alt="branch"
                      style={{ width: 30, marginRight: 10 }}
                    />
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{technique.name}{" "}</div>
                  </div> : null }
                </a>
              </div>
              <div className="branch-item" style={{ textAlign: "center", padding: 0 }}>
                <a
                  onClick={() => {
                    this.handleClick(business.id, business.name);
                  }}
                >
                  <div className='border-image-branch'>
                    {/* <img
              src={listBranch.items[0].imageUrl === null ? whileImage : listBranch.items[0].imageUrl}
              alt="branch"
              
            /> */}
                    <img
                      src={img_business}
                      alt="branch"
                      width="100%"
                      height="100%"
                      style={{ borderTopLeftRadius: '10.4528px', borderTopRightRadius: '10.4528px' }}
                    />
                  </div>
                  {business ? 
                  <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      src={business.imageUrl === null ? whileImage : business.imageUrl}
                      alt="branch"
                      style={{ width: 25, marginRight: 10 }}
                    />
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{business.name}{" "}</div>
                  </div> : null }
                </a>
              </div>
            </Col>
          )}
        </Row>
        <Row type='flex'>

          {listBranch && listBranch.items
            ? listBranch.items.map((item, index) => {
              if (item.id !== 21 && item.id !== 2 && item.id !== 13) {
                return (
                  <Col xs={12} sm={6} md={6} lg={6} xl={4} xxl={4} key={index}>
                    <div className="branch-item" style={{ textAlign: "center" }}>
                      <a
                        id={`a-${item.id}`}
                        onClick={() => {

                          this.handleClick(item.id, item.name);
                        }}
                      >
                        <div className='border-image-branch'>
                          <img
                            src={item.imageUrl === null ? whileImage : item.imageUrl}
                            alt="branch"
                            className="image-branch"
                          />
                        </div>

                        <div className='name-branch'>
                          {item.name}{" "}
                        </div>
                      </a>
                    </div>
                  </Col>
                )
              }
            }
            )
            : null}

        </Row>
      </div>
    );


  }
}

const mapStateToProps = (state) => ({
  eventID: state.DetailEvent.eventID,
  schoolID: state.DetailEvent.schoolID
});

const mapDispatchToProps = (dispatch) => ({
  getEvenJob: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.JOB.NORMAL, pageIndex, pageSize }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
