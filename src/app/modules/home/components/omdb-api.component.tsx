import * as React from "react";
import { IRootState } from "../../../store/model";
import { fetchTodos } from "../../../store/demo";
import { connect } from "react-redux";
import { ListComponent } from "../../../shared/components";
import { CheckCompletionComponent } from "./check-completion.component";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export interface IAPIDemoProps extends StateProps, DispatchProps {}

export interface IAPIDemoState {}

const columns = [
  {
    id: "userId",
    type: "string",
    label: "OMDB.USERID",
    numeric: false
  },
  {
    id: "title",
    type: "string",
    label: "OMDB.TITLE",
    numeric: false
  },
  {
    id: "completed",
    type: "boolean",
    label: "OMDB.COMPLETED",
    numeric: false,
    component: <CheckCompletionComponent />
  }
];

export class APIDemo extends React.Component<IAPIDemoProps, IAPIDemoState> {
  componentDidMount = () => {
    this.props.fetchTodos({});
  };

  render() {
    const { loading, todo } = this.props;
    return (
      <ListComponent
        data={todo}
        totalItems={todo.length}
        loading={loading}
        handlePagination={true}
        columns={columns}
      />
    );
  }
}

const mapStateToProps = ({ demo: { loading, todos: todo } }: IRootState) => ({
  todo,
  loading
});

const mapDispatchToProps = {
  fetchTodos
};

export const OMDbAPIComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(APIDemo);
