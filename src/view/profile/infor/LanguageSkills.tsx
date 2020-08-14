import React, { Component } from 'react';
import { connect } from 'react-redux';
import LanguageSkillItem from './../item/LanguageSkillItem';
import ILanguageSkill from '../../../models/language-skill';

interface IState {
    langSkState?: Array<any>;
    languageSkills: Array<any>;
    list_component: Array<any>;
}

interface IProps {
    langSkState?: any;
    updateLgState?: Function;
    languageSkills?: Array<ILanguageSkill>
}


class LanguageSkills extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            langSkState: [],
            languageSkills: [],
            list_component: []
        }
    }

    static getDerivedStateFromProps(nextProps?: IProps, prevState?: IState) {
        if (nextProps.langSkState !== prevState.langSkState) {
            let { languageSkills } = nextProps;
            let { langSkState } = prevState;
            let list_component = [];
            for (let i = 0; i < languageSkills.length; i++) {
                list_component.push(true)
            }
            return {
                languageSkills,
                langSkState,
                list_component
            };
        } return null
    }

    _updateLanguageSkillsState = (event?: any) => {
        let { langSkState } = this.state;
        let index = event.target.id;
        let item = !langSkState[index].is_fix;
        langSkState[index].is_fix = item;
        this.props.updateLgState(langSkState);
    }

    render() {
        let { languageSkills } = this.props;
       

        return (
            <div>
                {languageSkills && languageSkills.map((item: ILanguageSkill, index) => {
                    return (
                        <LanguageSkillItem
                            item={item}
                            key={index}
                            complete={'complete' + index + 'lg'}
                            fix={'fix' + index + 'lg'}
                            id={item.id}
                        />
                    )
                })}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        languageSkills: state.FullPersonalInfo.languageSkills,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSkills);