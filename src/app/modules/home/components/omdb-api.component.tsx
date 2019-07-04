import * as React from "react";
import { IRootState } from "../../../store/model";
import { fetchMovie } from "../../../store/omdb";
import { connect } from "react-redux";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IOMDbAPIProps extends StateProps, DispatchProps {}

export interface IOMDbAPIState {}

export class OMDbAPI extends React.Component<IOMDbAPIProps, IOMDbAPIState> {
  componentDidMount = () => {
    this.props.fetchMovie({});
  };

  render() {
    const { loading, movie } = this.props;
    console.log('loading', loading)
    console.log('movie', movie)
    return (
      <div>
        {movie.Title}
        {loading}
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
