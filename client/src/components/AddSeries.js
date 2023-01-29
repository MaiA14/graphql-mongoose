import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getCreatorsQuery, addSeriesMutation, getAllSeriesQuery } from '../queries/queries';
import swal from 'sweetalert';

class addSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            creatorId: ''
        };
    }

    displayCreators() {
        var data = this.props.getCreatorsQuery;
        if (data.loading) {
            return (<option disabled>Loading creators</option>);
        } else {
            return data.creators.map(creator => {
                return (<option key={creator.id} value={creator.id}>{creator.name}</option>);
            });
        }
    }
    submitForm(e) {
        e.preventDefault()
        if (!this.state.name || !this.state.genre || !this.state.creatorId) {
            swal("Could not add sereis due to missing details. ");
            return;
        }
        this.props.addSeriesMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                creatorId: this.state.creatorId
            },
            refetchQueries: [{ query: getAllSeriesQuery }]
        });
    }
    render() {
        return (
            <form id="add-series" onSubmit={this.submitForm.bind(this)} >
                <div className="field">
                    <label>Series name:</label>
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                </div>
                <div className="field">
                    <label>Creator:</label>
                    <select onChange={(e) => this.setState({ creatorId: e.target.value })} >
                        <option>Select creator</option>
                        {this.displayCreators()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getCreatorsQuery, { name: "getCreatorsQuery" }),
    graphql(addSeriesMutation, { name: "addSeriesMutation" })
)(addSeries);
