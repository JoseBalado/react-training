import * as React from "react";
import { IRootState } from "../../../../store/model";
import { fetchMovie } from "../../../../store/omdb";
import { connect } from "react-redux";

import  { PaperSheet } from "./omdb-paper.component"

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IOMDbAPIProps extends StateProps, DispatchProps {}

export interface IOMDbAPIState {}

export class OMDbAPI extends React.Component<IOMDbAPIProps, IOMDbAPIState> {
  componentDidMount = () => {
    // Default movie 'Lego'
    this.props.fetchMovie('Lego');
  };

  render() {
    const { loading, movie, fetchMovie } = this.props;
    console.log('loading', loading)
    console.log('movie', movie)
    return (
      <div>
        <PaperSheet
          Title={movie.Title}
          Plot={movie.Plot}
          Poster={movie.Poster}
          onSubmit={fetchMovie}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ movie: { loading, movie } }: IRootState) => ({
  movie,
  loading
});

const mapDispatchToProps = {
  fetchMovie
};

export const OMDbAPIComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(OMDbAPI);
