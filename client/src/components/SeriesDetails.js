import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getSeriesQuery } from '../queries/queries';

class SeriesDetails extends Component {
    displaySeriesDetails() {
        const { series } = this.props.data;
        if (series) {
            return (
                <div>
                    <h2>{series.name}</h2>
                    <p>{series.genre}</p>
                    <p>{series.creator.name}</p>
                    <p>All series by this creator:</p>
                    <ul className="other-series">
                        {series.creator.series.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return (<div>No series selected...</div>);
        }
    }
    render() {
        return (
            <div id="series-details">
                {this.displaySeriesDetails()}
            </div>
        );
    }
}

export default graphql(getSeriesQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.seriesId
            }
        }
    }
})(SeriesDetails);
