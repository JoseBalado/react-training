import * as React from "react";
import { IRootState } from "../../../store/model";
import { fetchMovie } from "../../../store/omdb";
import { connect } from "react-redux";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IAPIDemoProps extends StateProps, DispatchProps {}

export interface IAPIDemoState {}

export class APIDemo extends React.Component<IAPIDemoProps, IAPIDemoState> {
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
)(APIDemo);
