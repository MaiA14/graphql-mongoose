import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAllSeriesQuery } from '../queries/queries';

// components
import SeriesDetails from './SeriesDetails';

class SeriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }
    displayAllSeries() {
        var data = this.props.data;
        console.log(this.props.data)
        if (data.loading) {
            return (<div>Loading series...</div>);
        } else {
            return data.allSeries.map(series => {
                return (
                    <li key={series.id} onClick={(e) => this.setState({ selected: series.id })}>{series.name}</li>
                );
            })
        }
    }
    render() {
        return (
            <div>
                <ul id="series-list">
                    {this.displayAllSeries()}
                </ul>
                <SeriesDetails seriesId={this.state.selected} />
            </div>
        );
    }
}

export default graphql(getAllSeriesQuery)(SeriesList);
