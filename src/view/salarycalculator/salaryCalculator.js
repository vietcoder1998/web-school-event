import React, { Component, useEffect } from 'react';

// import logo from './logo.svg';
import './salaryCalculator.css';
import { Button, DatePicker, version, Input, Radio, InputNumber, Modal, notification, Form, Icon } from "antd";
// import {CalculatorOutlined, AppstoreAddOutlined} from '@ant-design/icons'
import "./index.css";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../layout/Layout';
import { TEXT_AREA, TEXT_AREA_I, TEXT_AREA_II, TEXT_AREA_III } from './data'
import { Container, Row, Col } from 'react-bootstrap';

const reg = /^-?[0-9]*(\.[0-9]*)?$/;
const getNumberWithDot = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const IncomeTaxRate = [
  { minSalary: -999999999999999999999999, maxSalary: 0, TaxableMoney: 0, Percent: 0, TaxDeduction: 0 },
  { minSalary: 0, maxSalary: 5000000, TaxableMoney: 0, Percent: 0.05, TaxDeduction: 0 },
  { minSalary: 5000000, maxSalary: 10000000, TaxableMoney: 5000000, Percent: 0.1, TaxDeduction: 250000 },
  { minSalary: 10000000, maxSalary: 18000000, TaxableMoney: 10000000, Percent: 0.15, TaxDeduction: 750000 },
  { minSalary: 18000000, maxSalary: 32000000, TaxableMoney: 18000000, Percent: 0.2, TaxDeduction: 1950000 },
  { minSalary: 32000000, maxSalary: 52000000, TaxableMoney: 32000000, Percent: 0.25, TaxDeduction: 4750000 },
  { minSalary: 52000000, maxSalary: 80000000, TaxableMoney: 52000000, Percent: 0.3, TaxDeduction: 9750000 },
  { minSalary: 80000000, maxSalary: 9999999999999999999999, TaxableMoney: 80000000, Percent: 0.35, TaxDeduction: 18150000 }
]

const minSalaryArea = [4420000, 3920000, 3430000, 3070000]

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salaryTemp: null,
      salaryTempText: null,
      salaryGross: 0,
      salaryNet: 0,
      dependentPerson: 0,
      salaryBeforeTaxGross: 0,
      salaryBeforeTaxNet: 0,
      PersonalDeductions: 11000000,
      isOnClicked: false,
      InsuranceMoney: 0,
      TaxMoney: 0,
      taxMoney: 0,
      dependentPeopleSalary: 4400000,
      area: 0,
      insurance: 0,
      visible: false,
      openModal: false,
      insurancePremiums: null,
      insurancePremiumsText: '',
      SocialInsurance: 0,
      SocialInsuranceAfterTax: 0,
      HealthInsurance: 0,
      HealthInsuranceAfterTax: 0,
      UnemploymentInsurance: 0,
      UnemploymentInsuranceAfterTax: 0,
      LaborAccidentInsurance: 0,
      IncomeBeforeTax: 0,
      IncomeAfterTax: 0
    }
  }

  componentDidMount() {

    //dong bao hiem tren 25tr
    console.log(this.netToGross(800000000, 0, 1, 25000000))
    // dong bao hiem tren luong chinh thuc
    // console.log(this.netToGross(800000000, 0, 1))

  }

  onChangeSalary = (e) => {
    let newSalaryTemp = e.target.value.replace(/\,/g, '');
    if (reg.test(newSalaryTemp)) {

      this.setState({ salaryTemp: (parseInt(newSalaryTemp)) });
      let newSalaryTempText = `${newSalaryTemp}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      this.setState({ salaryTempText: (newSalaryTempText) });

    }
  }

  insurancePremiums = (e) => {
    let newSalaryTemp = e.target.value.replace(/\,/g, '');
    if (reg.test(newSalaryTemp)) {
      this.setState({ insurancePremiums: (parseInt(newSalaryTemp)) });
      let newInsurancePremiumsText = `${newSalaryTemp}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      this.setState({ insurancePremiumsText: (newInsurancePremiumsText) });
    }
  }
  onChangeDependentPerson = (e) => {
    this.setState({ dependentPerson: e.target.value })
  }
  getMaxGross(maxSalaryTax, numberOfDependentPeople, area, insuranceSalary) {
    let twentyBasicSalary = 20 * 1490000
    let tempt
    let twentyMinSalaryArea = 20 * minSalaryArea[area - 1]
    if (!insuranceSalary) {
      tempt = (maxSalaryTax + this.state.PersonalDeductions + numberOfDependentPeople * this.state.dependentPeopleSalary) / 0.895
      if (tempt < twentyBasicSalary && tempt < twentyMinSalaryArea) {
        return tempt
      } else if (tempt > twentyBasicSalary && tempt < twentyMinSalaryArea) {
        return (maxSalaryTax + this.state.PersonalDeductions + numberOfDependentPeople * this.state.dependentPeopleSalary + 0.095 * twentyBasicSalary) / 0.99
      } else if (tempt < twentyBasicSalary && tempt > twentyMinSalaryArea) {
        return (maxSalaryTax + this.state.PersonalDeductions + numberOfDependentPeople * this.state.dependentPeopleSalary + 0.01 * twentyMinSalaryArea) / 0.905
      } else {
        return (maxSalaryTax + this.state.PersonalDeductions + numberOfDependentPeople * this.state.dependentPeopleSalary + 0.01 * twentyMinSalaryArea + 0.095 * twentyBasicSalary)
      }
    } else {
      if (insuranceSalary >= 20 * 1490000) {
        insuranceSalary = 20 * 1490000
      }
      tempt = (maxSalaryTax + this.state.PersonalDeductions + numberOfDependentPeople * this.state.dependentPeopleSalary + 0.01 * insuranceSalary + 0.095 * insuranceSalary)
      // if(tempt > twentyMinSalaryArea) {
      //   return (maxSalaryTax + this.state.PersonalDeductions + numberOfDependentPeople * this.state.dependentPeopleSalary + 0.01 * twentyMinSalaryArea + 0.095 * insuranceSalary)
      // } else {
      console.log('vao day 2')
      return tempt
      // }
    }

  }
  netToGross(netSalary, numberOfDependentPeople, area, insuranceSalary) {
    let rangeSalaryNet = [
      0,
      this.getGrossToNet(this.getMaxGross(0, numberOfDependentPeople, area, insuranceSalary)),
      this.getGrossToNet(this.getMaxGross(5000000, numberOfDependentPeople, area, insuranceSalary)),
      this.getGrossToNet(this.getMaxGross(10000000, numberOfDependentPeople, area, insuranceSalary)),
      this.getGrossToNet(this.getMaxGross(18000000, numberOfDependentPeople, area, insuranceSalary)),
      this.getGrossToNet(this.getMaxGross(32000000, numberOfDependentPeople, area, insuranceSalary)),
      this.getGrossToNet(this.getMaxGross(52000000, numberOfDependentPeople, area, insuranceSalary)),
      this.getGrossToNet(this.getMaxGross(80000000, numberOfDependentPeople, area, insuranceSalary)),
      9999999999999999999999
    ]
    console.log(rangeSalaryNet)
    let indexRangeSalaryNet
    for (let i = 0; i < rangeSalaryNet.length - 1; i++) {
      // console.log(rangeSalaryNet[i+1])
      if (netSalary >= rangeSalaryNet[i] && netSalary <= rangeSalaryNet[i + 1]) {
        indexRangeSalaryNet = i
        break;
      }
    }
    if (indexRangeSalaryNet === 0) {

      let tempt = (netSalary - this.state.PersonalDeductions - numberOfDependentPeople * this.state.dependentPeopleSalary)
      return this.getMaxGross(tempt, numberOfDependentPeople, area, insuranceSalary)
    }
    if (indexRangeSalaryNet === 1) {
      let tempt = (netSalary - this.state.PersonalDeductions - numberOfDependentPeople * this.state.dependentPeopleSalary) / 0.95
      return this.getMaxGross(tempt, numberOfDependentPeople, area, insuranceSalary)
    }
    if (indexRangeSalaryNet === 2) {
      let tempt = (netSalary - this.state.PersonalDeductions - numberOfDependentPeople * this.state.dependentPeopleSalary + 250000 - 500000) / 0.9
      return this.getMaxGross(tempt, numberOfDependentPeople, area, insuranceSalary)
    }
    if (indexRangeSalaryNet === 3) {
      console.log('vao day')
      //10tr * 15%
      let tempt = (netSalary - this.state.PersonalDeductions - numberOfDependentPeople * this.state.dependentPeopleSalary + 750000 - 1500000) / 0.85
      return this.getMaxGross(tempt, numberOfDependentPeople, area, insuranceSalary)
    }
    if (indexRangeSalaryNet === 4) {
      //18tr * 20 %
      let tempt = (netSalary - this.state.PersonalDeductions - numberOfDependentPeople * this.state.dependentPeopleSalary + 1950000 - 3600000) / 0.8
      return this.getMaxGross(tempt, numberOfDependentPeople, area, insuranceSalary)
    }
    if (indexRangeSalaryNet === 5) {
      //32tr * 25 %
      let tempt = (netSalary - this.state.PersonalDeductions - numberOfDependentPeople * this.state.dependentPeopleSalary + 4750000 - 8000000) / 0.75
      return this.getMaxGross(tempt, numberOfDependentPeople, area, insuranceSalary)
    }
    if (indexRangeSalaryNet === 6) {
      //52tr * 30 %
      let tempt = (netSalary - this.state.PersonalDeductions - numberOfDependentPeople * this.state.dependentPeopleSalary + 9750000 - 15600000) / 0.7
      return this.getMaxGross(tempt, numberOfDependentPeople, area, insuranceSalary)
    }
    if (indexRangeSalaryNet === 7) {
      //80tr * 35 %
      let tempt = (netSalary - this.state.PersonalDeductions - numberOfDependentPeople * this.state.dependentPeopleSalary + 18150000 - 28000000) / 0.65
      return this.getMaxGross(tempt, numberOfDependentPeople, area, insuranceSalary)
    }
  }

  getGrossToNet(gross) {
    // this.setState({ isOnClicked: true })
    let insuranceSalary
    if (this.state.insurance === 0) {
      insuranceSalary = gross
    } else {
      insuranceSalary = this.state.insurancePremiums
    }
    let SocialInsurance = parseInt(insuranceSalary * 8 / 100);
    let HealthInsurance = parseInt(insuranceSalary * 1.5 / 100);
    let SocialInsuranceAndHealthInsurance = SocialInsurance + HealthInsurance
    let twentyBasicSalary = 20 * 1490000
    if (SocialInsuranceAndHealthInsurance > twentyBasicSalary * 0.095) {
      SocialInsuranceAndHealthInsurance = twentyBasicSalary * 0.095
    }
    let UnemploymentInsurance = parseInt(insuranceSalary * 1 / 100);
    if (UnemploymentInsurance > (20 * minSalaryArea[this.state.area]) * 0.01) {
      UnemploymentInsurance = (20 * minSalaryArea[this.state.area] * 0.01)
    }
    let InsuranceMoney = SocialInsurance + HealthInsurance + UnemploymentInsurance;
    let salaryBeforeTaxGross = parseInt(gross - SocialInsuranceAndHealthInsurance - UnemploymentInsurance);
    let IncomeBeforeTax = parseInt(salaryBeforeTaxGross - this.state.PersonalDeductions - this.state.dependentPerson * 4400000);
    let netSalary
    // this.setState({ InsuranceMoney: InsuranceMoney })
    IncomeTaxRate.forEach(element => {
      if (IncomeBeforeTax > element.minSalary && IncomeBeforeTax <= element.maxSalary) {
        netSalary = salaryBeforeTaxGross - ((IncomeBeforeTax - element.TaxableMoney) * element.Percent) - element.TaxDeduction
        // console.log(netSalary)
      }

    });
    return netSalary
  }

  CalcNetToGross = async () => {
    this.setState({ isOnClicked: true })
    let temptGross
    if (this.state.insurance === 0) {
      temptGross = this.netToGross(this.state.salaryTemp, this.state.dependentPerson, this.state.area + 1)
      console.log(temptGross)
    } else {
      temptGross = this.netToGross(this.state.salaryTemp, this.state.dependentPerson, this.state.area + 1, this.state.insurancePremiums)
    }
    // await this.setState({ salaryTemp: temptGross })
    await this.setState({ salaryGross: temptGross })

    this.GrossToNet(temptGross)
  }
  GrossToNet = (newSalaryTemp) => {
    // ---------------------------------------------------------
    // Diễn giải chi tiết
    this.setState({ isOnClicked: true, salaryGross: newSalaryTemp })
    let insuranceSalary
    if (this.state.insurance === 0) {
      insuranceSalary = newSalaryTemp
    } else {
      insuranceSalary = this.state.insurancePremiums
    }
    let SocialInsurance = parseInt(insuranceSalary * 8 / 100);
    let HealthInsurance = parseInt(insuranceSalary * 1.5 / 100);
    let SocialInsuranceAndHealthInsurance = SocialInsurance + HealthInsurance
    let twentyBasicSalary = 20 * 1490000

    if (SocialInsuranceAndHealthInsurance > twentyBasicSalary * 0.095) {
      SocialInsuranceAndHealthInsurance = twentyBasicSalary * 0.095
    }
    let UnemploymentInsurance = parseInt(insuranceSalary * 1 / 100);
    if (UnemploymentInsurance > (20 * minSalaryArea[this.state.area]) * 0.01) {
      UnemploymentInsurance = 20 * minSalaryArea[this.state.area] * 0.01
    }

    let InsuranceMoney = SocialInsurance + HealthInsurance + UnemploymentInsurance;
    let salaryBeforeTaxGross = parseInt(newSalaryTemp - SocialInsuranceAndHealthInsurance - UnemploymentInsurance);
    let IncomeBeforeTax = parseInt(salaryBeforeTaxGross - this.state.PersonalDeductions - this.state.dependentPerson * 4400000);

    this.setState({ SocialInsurance, HealthInsurance, UnemploymentInsurance, salaryBeforeTaxGross, IncomeBeforeTax })

    this.setState({ InsuranceMoney: InsuranceMoney })

    IncomeTaxRate.forEach(element => {
      if (IncomeBeforeTax > element.minSalary && IncomeBeforeTax <= element.maxSalary) {
        this.setState({
          salaryNet: salaryBeforeTaxGross - ((IncomeBeforeTax - element.TaxableMoney) * element.Percent) - element.TaxDeduction,
          TaxMoney: ((IncomeBeforeTax - element.TaxableMoney) * element.Percent) + element.TaxDeduction
        })
      }

    });


    // -------------------------------------------------------------------
    // Người sử dụng lao động trả
    let SocialInsuranceAfterTax = parseInt(insuranceSalary * 17 / 100);
    let HealthInsuranceAfterTax = parseInt(insuranceSalary * 3 / 100);
    let LaborAccidentInsurance = parseInt(insuranceSalary * 0.5 / 100);
    let SocialInsuranceAndHealthInsuranceAfterTax = parseInt(SocialInsuranceAfterTax + HealthInsuranceAfterTax + LaborAccidentInsurance)

    if (SocialInsuranceAndHealthInsuranceAfterTax > twentyBasicSalary * 0.095) {
      SocialInsuranceAndHealthInsuranceAfterTax = twentyBasicSalary * 0.095
    }
    let UnemploymentInsuranceAfterTax = parseInt(insuranceSalary * 1 / 100);
    if (UnemploymentInsuranceAfterTax > (20 * minSalaryArea[this.state.area]) * 0.01) {
      UnemploymentInsuranceAfterTax = 20 * minSalaryArea[this.state.area] * 0.01
    }
    let salaryGrossAfter = parseInt(newSalaryTemp)
    let IncomeAfterTax = parseInt(SocialInsuranceAndHealthInsuranceAfterTax + UnemploymentInsuranceAfterTax + salaryGrossAfter)
    this.setState({ SocialInsuranceAfterTax, HealthInsuranceAfterTax, LaborAccidentInsurance, UnemploymentInsuranceAfterTax, IncomeAfterTax })
  }

  onChangeArea = (e) => {

    this.setState({
      area: e.target.value
    });
  };

  onChangeInsurance = (e) => {
    this.setState({
      insurance: e.target.value
    });
  }
  showModal = () => {
    this.setState({ visible: true })
  }

  cancelModal = () => {
    this.setState({ visible: false })
  }

  handlOpen = () => {
    this.setState({ openModal: true })
  }

  handleCancel = () => {
    this.setState({ openModal: false })
  }

  openNotification = () => {
    notification.open({
      type: 'error',
      message: 'Thông báo',
      description: 'Bạn chưa nhập số tiền đóng bảo hiểm',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  openNotificationn = () => {
    notification.open({
      type: 'error',
      message: 'Thông báo',
      description: 'Bạn chưa nhập tiền lương',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  grosstoNet = () => {
    this.setState({ isOnClicked: true })
    if ((this.state.salaryTempText && this.state.insurance === 0) ||
      (this.state.salaryTempText && this.state.insurance === 1 && this.state.insurancePremiumsText)) {
      this.GrossToNet(this.state.salaryTemp)
    }

  }

  render() {


    return (
      <Layout disableFooterData={false}>
        <div style={{ padding: '5%', paddingTop: '2%', backgroundColor: '#f2f2f2', minHeight: '100vh' ,fontFamily: 'Arial, Helvetica, sans-serif'}}
          className='mother-div'
        >
          <Modal
            title={
              <span>
                <p style={{ fontSize: 18, fontWeight: 'bold', padding: '5px' }}>Mức lương tối thiểu vùng</p>
                <p>Áp dụng mức lương tối thiểu vùng mới nhất có hiệu lực từ ngày 1/1/2020 (Theo điều 3, Nghị định 90/2019/NĐ-CP)</p>
              </span>
            }
            visible={this.state.visible}
            onCancel={this.cancelModal}
            footer={
              <Button
                onClick={this.cancelModal}
                type='primary'
              >
                Đóng
            </Button>
            }
            width={900}
            style={{ top: 20 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>
              <p className='TEXT_AREA'>
                {TEXT_AREA}
              </p>
              <p style={{ fontWeight: 'bold' }}>
                1. Vùng I, gồm các địa bàn:
            </p>
              <p className='TEXT_AREA'>
                {TEXT_AREA_I}
              </p>
              <p style={{ fontWeight: 'bold' }}>
                2. Vùng II, gồm các địa bàn:
            </p>
              <p className='TEXT_AREA'>
                {TEXT_AREA_II}
              </p>
              <p style={{ fontWeight: 'bold' }}>
                3. Vùng III, gồm các địa bàn:
            </p>
              <p className='TEXT_AREA'>
                {TEXT_AREA_III}
              </p>
              <p style={{ fontWeight: 'bold' }}>
                4. Vùng IV, gồm các địa bàn còn lại
            </p>
            </div>
          </Modal>
          <Modal
            title={
              <span style={{ fontStyle: 18, fontWeight: 'bold', padding: '5px', textAlign: 'center' }}>
                Quy định tính lương mới nhất áp dụng từ 1/7/2020
            </span>
            }
            visible={this.state.openModal}
            onCancel={this.handleCancel}
            style={{ padding: 10 }}
            footer={
              <Button
                onClick={this.handleCancel}
                type='primary'
              >
                Đóng
            </Button>
            }
          >

            <div style={{ display: 'flex', flexDirection: 'row' }} >
              <p>Lương cơ sở: </p><p style={{ marginLeft: 10, color: 'red' }}>1,490,000đ</p>  <br />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p>Giảm trừ gia cảnh bản thân: </p><p style={{ marginLeft: 5, color: 'red' }}>11,000,000đ/tháng</p>  <br />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p>Người phụ thuộc: </p><p style={{ marginLeft: 10, color: 'red' }}>4,400,000đ/người/tháng</p>  <br />
            </div>

          </Modal>
          <div className="App" style={{ paddingTop: '1%', paddingBottom: '1%', backgroundColor: 'white', minHeight: '80vh' }}>

            {/* BANNER */}
            <p id='textBanner' style={{  fontSize: 20, fontWeight: 'bold' }}>Công cụ tính lương Gross sang Net / Net sang Gross chuẩn 2020</p>
            <p style={{ fontWeight: 'initial', fontSize: 15,fontWeight: 520 }}>Áp dụng mức giảm trừ gia cảnh mới nhất 11 triệu đồng/tháng (132 triệu đồng/năm) với nguời nộp thuế và 4,4 triệu đồng/tháng với mỗi người phụ thuộc</p>
            <p style={{ fontWeight: 'initial', fontSize: 15 }}> (Theo Nghị quyết số 954/2020/UBTVQH14)</p>

            {/* MAIN */}

            <Container >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ fontWeight: 'bold' }}>Áp dụng quy Định:</p>
                <p style={{ color: 'RoyalBlue', marginLeft: 10 }}>Từ 1/7/2020</p>
                <p style={{ color: 'red', fontStyle: 'italic' }}>(Mới nhất)</p>
                <Button style={{ fontStyle: 'italic', marginLeft: 10, borderRadius: 50, fontSize: 11, padding: 5, }} onClick={this.handlOpen}>Chi tiết</Button>
              </div>
              <Row style={{ width: '80vw', textAlign: 'start' }} >
                <Col xs={12} sm={4} md={4} lg={3} xl={3} >
                  <p style={{  fontStyle: 'italic', fontSize: 13 ,fontWeight: 545}} >Lương cơ sở: 1,490,000 VNĐ</p>
                </Col>
                <Col xs={12} sm={4} md={6} lg={5} xl={4} >
                  <p style={{ fontStyle: 'italic', fontSize: 13,fontWeight: 520 }}>Giảm trừ gia cảnh bản thân: 11,000,000 VNĐ</p>
                </Col>
                <Col xs={12} sm={4} md={5} lg={4} xl={3} >
                  <p style={{ fontStyle: 'italic', fontSize: 13,fontWeight: 520 }}>Người phụ thuộc: 4,400,000 VNĐ</p>
                </Col>
              </Row>
              <div style={{ marginTop: 30, width: '100%', borderTopColor: 'black', borderTopWidth: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Form>
                  <Form.Item
                    validateStatus={!this.state.salaryTempText && this.state.isOnClicked === true ? 'error' : null}
                    help={!this.state.salaryTempText && this.state.isOnClicked === true ? <p style={{ textAlign: 'start', marginLeft: '20vw' }}>Bạn chưa nhập lương</p> : ''}
                  >
                    <Row style={{ width: '87vw', textAlign: 'start' }}>
                      <Col xs={5} sm={4} md={4} lg={3} xl={3} >
                        <text style={{ fontWeight: 'bold' }}>Thu nhập(VNĐ) : </text>
                      </Col>
                      <Col xs={7} sm={4} md={4} lg={3} xl={2}>
                        <Input placeholder="10,000,000"
                          value={this.state.salaryTempText}
                          style={{ borderRadius: 5 }}
                          onChange={this.onChangeSalary}
                          allowClear
                          defaultValue={null}
                          min={0}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
                <Row style={{ width: '87vw', textAlign: 'start', marginTop: 20 }}>
                  <Col xs={5} sm={4} md={4} lg={3} xl={3}>
                    <text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'start' }}>Người phụ thuộc(Người) : </text>
                  </Col>
                  <Col xs={7} sm={4} md={4} lg={3} xl={2}>
                    <Input
                      style={{ borderRadius: 5 }}
                      onChange={this.onChangeDependentPerson}
                      allowClear
                      defaultValue={0}
                      type='number'
                      min={0}
                    />
                  </Col>

                </Row>
                <Form>
                  <Form.Item
                    validateStatus={!this.state.insurancePremiums && this.state.isOnClicked === true && this.state.insurance === 1 ? 'error' : null}
                    help={!this.state.insurancePremiums && this.state.isOnClicked === true && this.state.insurance === 1 ? <p style={{ textAlign: 'start', marginLeft: '20vw', fontSize: 14, width: '80vw' }}>Bạn chưa nhập tiền đóng bảo hiểm</p> : ''}
                  >
                    <Row style={{ width: '87vw', marginTop: 20, textAlign: 'start' }} >
                      <Col xs={5} sm={4} md={4} lg={3} xl={3}>
                        <text style={{ fontWeight: 'bold', }}>Đóng bảo hiểm : </text>
                      </Col>
                      <Col xs={7} sm={4} md={4} lg={3} xl={2}>
                        <Radio.Group onChange={this.onChangeInsurance} value={this.state.insurance} style={{}}>

                          <Radio value={0}>Trên lương chính thức</Radio>

                          <Radio value={1}>Khác:<Input
                            placeholder={this.state.insurance !== 0 ? '1,000,000' : null}
                            style={{ borderRadius: 5, marginLeft: 2 }}
                            onChange={this.insurancePremiums}
                            value={this.state.insurancePremiumsText}
                            allowClear
                            defaultValue={null}
                            style={{ width: '70%', marginLeft: '5px' }}
                            disabled={this.state.insurance === 0 ? true : false}
                          /> </Radio>

                        </Radio.Group>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
                <Row style={{ width: '87vw', textAlign: 'start' }}>
                  <Col style={{ marginTop: 10 }} xs={5} sm={4} md={4} lg={3} xl={3}>
                    <text style={{ fontWeight: 'bold' }} >Vùng <a onClick={this.showModal} style={{ fontSize: 13, color: 'RoyalBlue' }}>(Giải thích) </a>:</text>
                  </Col>
                  <Col xs={7} sm={4} md={7} lg={6} xl={6} style={{ marginLeft: '-1px' }}>
                    <Radio.Group onChange={this.onChangeArea} value={this.state.area} >
                      <Radio style={{ marginTop: '5px' }} value={0}>Vùng 1</Radio>
                      <Radio style={{ marginTop: '10px' }} value={1}>Vùng 2</Radio>
                      <Radio style={{ marginTop: '10px' }} value={2}>Vùng 3</Radio>
                      <Radio style={{ marginTop: '10px' }} value={3}>Vùng 4</Radio>
                    </Radio.Group>
                  </Col>
                </Row>

                <Row style={{ width: '87vw', marginTop: 20, justifyContent: 'center' }}>
                  <Col xs={6} sm={4} md={4} lg={3} xl={2} >
                    <Button type="primary"
                      style={{ borderRadius: 10, }}
                      onClick={this.grosstoNet}
                      className='btnClick'
                    >
                      <Icon type="calculator" style={{ fontSize: 20, marginBottom: 10 }} />
                    Gross to Net
                  </Button>
                  </Col>
                  <Col xs={6} sm={4} md={4} lg={3} xl={2}>
                    <Button type="primary"
                      style={{ borderRadius: 10, }}
                      onClick={this.CalcNetToGross}
                      className='btnClick'

                    >
                      <Icon type="appstore" style={{ fontSize: 20, marginBottom: 10 }} />
                    Net to Gross
                  </Button>
                  </Col>
                </Row>

              </div>
            </Container>
            {/* TABLE SALARY/ */}


            {(this.state.isOnClicked === true && this.state.salaryGross) ?
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                <div style={{ display: "flex", flexDirection: 'row', width: '90%', backgroundColor: 'Gainsboro' }}>
                  <div className="table1">
                    <p>Lương Gross</p>
                  </div>
                  <div className="table1">
                    <p>Bảo hiểm</p>
                  </div>
                  <div className="table1">
                    <p>Thuế TNCN</p>
                  </div>
                  <div className="table1">
                    <p>Lương Net</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: 'row', width: '90%' }}>
                  <div className="table2">
                    {this.state.salaryGross ? getNumberWithDot((this.state.salaryGross).toFixed()) : 0}
                  </div>
                  <div className="table2">
                    -  {getNumberWithDot(this.state.InsuranceMoney.toFixed())}
                  </div>
                  <div className="table2">
                    -  {getNumberWithDot(this.state.TaxMoney.toFixed())}
                  </div>
                  <div className="table2">
                    {getNumberWithDot(this.state.salaryNet.toFixed())}
                  </div>
                </div>

                {/* Diễn giải chi tiết */}
                {this.state.salaryTemp !== null ?
                  <div style={{ width: '90%', marginTop: 50 }} className='text'>
                    <p style={{ fontSize: 15, fontWeight: 'bold', color: 'DodgerBlue', textAlign: 'start' }}>Diễn giải chi tiết (VND)</p>

                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'Gainsboro', height: 40, alignItems: 'center', borderBottomColor: 'Gainsboro', borderWidth: 1, paddingRight: 10 }} 
                    
                      >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Lương GROSS
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        {/* {getNumberWithDot(this.state.salaryGross)} */}
                        {this.state.salaryGross ? getNumberWithDot((this.state.salaryGross).toFixed()) : 0}

                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Bảo hiểm xã hội (8%)
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        - {getNumberWithDot(this.state.SocialInsurance.toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Bảo hiểm y tế (1.5%)
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        - {getNumberWithDot(this.state.HealthInsurance.toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Bảo hiểm thất nghiệp (1%)
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        - {getNumberWithDot(this.state.UnemploymentInsurance.toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'Gainsboro', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Thu nhập trước thuế
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        {getNumberWithDot(this.state.salaryBeforeTaxGross.toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Giảm trừ gia cảnh bản thân
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        - {getNumberWithDot(this.state.PersonalDeductions)}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Giảm trừ gia cảnh người phụ thuộc
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        - {getNumberWithDot(this.state.dependentPerson * 4400000)}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'Gainsboro', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Thu nhập chịu thuế
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        {getNumberWithDot((this.state.IncomeBeforeTax > 0 ? this.state.IncomeBeforeTax : 0).toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Thuế thu nhập cá nhân(*)
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        - {getNumberWithDot(this.state.TaxMoney.toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'Gainsboro', alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, flexDirection: 'column' }}>
                        <p style={{ fontWeight: 'bold' }}>Lương NET</p>
                        <p style={{ marginTop: -20 }}>(Thu nhập trước thuế - Thuế thu nhập cá nhân) </p>
                      </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        {getNumberWithDot(this.state.salaryNet.toFixed())}
                      </div>
                    </div >

                    {/* Chi tiết thuế thu nhập cá nhân (VNĐ) */}
                    <p style={{ fontSize: 15, fontWeight: 'bold', color: 'DodgerBlue', marginTop: 50, textAlign: 'start' }}>(*) Chi tiết thuế thu nhập cá nhân (VNĐ)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'end', height: 40, backgroundColor: 'Gainsboro', alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, fontSize: 15, flexDirection: 'column', fontWeight: 'bold' }}>
                        Mức chịu thuế
                    </div>
                      <div style={{ flex: 3, fontWeight: 'bold', alignItems: 'flex-end' }}>
                        Thuế suất
                    </div>
                      <div style={{ flex: 2, fontWeight: 'bold' }}>
                        Tiền nộp
                    </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'end', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} className='number'>
                      <div style={{ flex: 3, fontSize: 15, flexDirection: 'column' }}>
                        Đến 5 triệu VNĐ
                    </div>
                      <div style={{ flex: 3, padding: '5px' }}>
                        5%
                    </div>
                      <div style={{ flex: 2, minWidth: '100px' }}>
                        {getNumberWithDot((this.state.TaxMoney <= 0 ? 0 : (this.state.TaxMoney > 0 && this.state.TaxMoney <= 250000 ? this.state.TaxMoney : 250000)).toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'end', height: 50, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} className='number'>
                      <div style={{ flex: 3, fontSize: 15, flexDirection: 'column' }}>
                        Trên 5 đến 10 triệu VNĐ
                    </div>
                      <div style={{ flex: 3 }}>
                        10%
                    </div>
                      <div style={{ flex: 2, minWidth: '100px' }}>
                        {getNumberWithDot((this.state.TaxMoney <= 250000 ? 0 : (this.state.TaxMoney > 250000 && this.state.TaxMoney <= 750000 ? this.state.TaxMoney - 250000 : 500000)).toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'end', height: 50, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} className='number'>
                      <div style={{ flex: 3, fontSize: 15, flexDirection: 'column' }}>
                        Trên 10 đến 18 triệu VNĐ
                    </div>
                      <div style={{ flex: 3 }}>
                        15%
                    </div>
                      <div style={{ flex: 2, minWidth: '100px' }}>
                        {getNumberWithDot((this.state.TaxMoney <= 750000 ? 0 : (this.state.TaxMoney > 750000 && this.state.TaxMoney <= 1950000 ? this.state.TaxMoney - 750000 : 1200000)).toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'end', height: 50, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} className='number'>
                      <div style={{ flex: 3, fontSize: 15, flexDirection: 'column' }}>
                        Trên 18 đến 32 triệu VNĐ
                    </div>
                      <div style={{ flex: 3 }}>
                        20%
                    </div>
                      <div style={{ flex: 2, minWidth: '100px' }}>
                        {getNumberWithDot((this.state.TaxMoney <= 1950000 ? 0 : (this.state.TaxMoney > 1950000 && this.state.TaxMoney <= 4750000 ? this.state.TaxMoney - 1950000 : 2800000)).toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'end', height: 50, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} className='number'>
                      <div style={{ flex: 3, fontSize: 15, flexDirection: 'column' }}>
                        Trên 32 đến 52 triệu VNĐ
                    </div>
                      <div style={{ flex: 3 }}>
                        25%
                    </div>
                      <div style={{ flex: 2, minWidth: '100px' }}>
                        {getNumberWithDot((this.state.TaxMoney <= 4750000 ? 0 : (this.state.TaxMoney > 4750000 && this.state.TaxMoney <= 9750000 ? this.state.TaxMoney - 4750000 : 5000000)).toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'end', height: 50, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} className='number'>
                      <div style={{ flex: 3, fontSize: 15, flexDirection: 'column' }}>
                        Trên 52 đến 80 triệu VNĐ
                    </div>
                      <div style={{ flex: 3 }}>
                        30%
                    </div>
                      <div style={{ flex: 2, minWidth: '100px' }}>
                        {getNumberWithDot((this.state.TaxMoney <= 9750000 ? 0 : (this.state.TaxMoney > 9750000 && this.state.TaxMoney <= 18150000 ? this.state.TaxMoney - 9750000 : 8400000)).toFixed())}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'end', height: 50, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} className='number'>
                      <div style={{ flex: 3, fontSize: 15, flexDirection: 'column' }}>
                        Trên 80 triệu VNĐ
                    </div>
                      <div style={{ flex: 3 }}>
                        35%
                    </div>
                      <div style={{ flex: 2, minWidth: '100px' }}>
                        {getNumberWithDot((this.state.TaxMoney <= 18150000 ? 0 : (this.state.TaxMoney > 18150000 ? this.state.TaxMoney - 18150000 : 0)).toFixed())}
                      </div>
                    </div >

                    {/* Người sử dụng lao động trả */}
                    <p style={{ fontSize: 15, fontWeight: 'bold', color: 'DodgerBlue', marginTop: 50, textAlign: 'start' }}>Người sử dụng lao động trả (VNĐ)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'Gainsboro', height: 40, alignItems: 'center', borderBottomColor: 'Gainsboro', borderWidth: 1, paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Lương GROSS
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        {/* {getNumberWithDot(this.state.salaryGross)} */}
                        {this.state.salaryGross ? getNumberWithDot((this.state.salaryGross).toFixed()) : 0}

                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Bảo hiểm xã hội (17%)
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        + {getNumberWithDot(this.state.SocialInsuranceAfterTax)}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 60, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Bảo hiểm Tai nạn lao động - Bệnh nghề nghiệp (0.5%)
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        + {getNumberWithDot(this.state.HealthInsuranceAfterTax)}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Bảo hiểm y tế (3%)
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        + {getNumberWithDot(this.state.UnemploymentInsuranceAfterTax)}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Bảo hiểm thất nghiệp (1%)
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        + {getNumberWithDot(this.state.LaborAccidentInsurance)}
                      </div>
                    </div >

                    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'Gainsboro', height: 40, alignItems: 'center', borderBottom: '1px solid Gainsboro', paddingRight: 10 }} >
                      <div style={{ flex: 3, textAlign: 'end', fontSize: 15, fontWeight: 'bold' }}>
                        Tổng cộng
                  </div>
                      <div style={{ flex: 1, textAlign: 'end', minWidth: '100px' }} className='number'>
                        {getNumberWithDot(this.state.IncomeAfterTax)}
                      </div>
                    </div >
                  </div> : null}
              </div>
              : this.openNotificationn}
          </div>
        </div >
      </Layout>
    );
  }
}

export default App;
