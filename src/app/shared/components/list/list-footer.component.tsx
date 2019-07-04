import * as React from 'react';
import { AlignedRowComponent } from '../aligned-row.component';
import {
  ListPaginationComponent,
  IListPaginationProps
} from './list-pagination.component';

export interface ListFooterComponentProps extends IListPaginationProps {
  components?: React.ReactNode;
  hidePagination?: boolean;
}

export interface ListFooterComponentState {}

export class ListFooterComponent extends React.Component<
  ListFooterComponentProps,
  ListFooterComponentState
> {
  render() {
    const { hidePagination, components } = this.props;
    return (
      <AlignedRowComponent
        leftComponents={
          !hidePagination && <ListPaginationComponent {...this.props} />
        }
        rightComponents={components}
      />
    );
  }
}
