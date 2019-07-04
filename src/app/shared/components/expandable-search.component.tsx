import * as React from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  IconButton,
  InputBase
} from "@material-ui/core";

import { SearchOutlined } from "@material-ui/icons";
import { preventSubmit } from "../utils";
import { FormattedMessage } from "react-intl";

/**
 *
 *
 * @export
 * @interface IExpandableSearchProps
 */
export interface IExpandableSearchProps {
  /**
   * called when a search term is entered
   *
   * @memberof IExpandableSearchProps
   */
  searchSubmit: (value: any) => void;
}

export interface IExpandableSearchState {
  /**
   * Search input shown when true
   *
   * @type {boolean}
   * @memberof IExpandableSearchState
   */
  showSearch: boolean;
  /**
   * Term searched for
   *
   * @type {string}
   * @memberof IExpandableSearchState
   */
  searchTerm: string;
}

const styles = (theme: Theme) =>
  createStyles({
    searchContainer: {
      backgroundColor: "white",
      width: theme.spacing(6),
      height: theme.spacing(6),
      boxShadow: theme.shadows[1],
      display: "flex"
    },
    searchBox: {
      flexGrow: 0.9
    },
    searchInput: {
      flexGrow: 0.9,
      marginRight: theme.spacing(3)
    },
    searchIcon: {
      borderRadius: 0,
      "&:hover": {
        background: (theme.palette.secondary as any)[50]
      }
    }
  });

/**
 *
 *
 * @export
 * @class ExpandableSearch
 * @extends {(React.Component<IExpandableSearchProps & WithStyles<typeof styles>, IExpandableSearchState>)}
 */
export class ExpandableSearch extends React.Component<
  IExpandableSearchProps & WithStyles<typeof styles>,
  IExpandableSearchState
> {
  state = { showSearch: false, searchTerm: "" };

  handleSearchClicked = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  onChange = (event: any) => {
    this.setState({ ...this.state, searchTerm: event.target.value });
    this.props.searchSubmit(event.target.value);
  };

  render() {
    const {
      classes: { searchBox, searchContainer, searchIcon, searchInput }
    } = this.props;
    const { searchTerm, showSearch } = this.state;
    return (
      <div className={`${searchContainer} ${showSearch ? searchBox : ""}`}>
        <IconButton className={searchIcon} onClick={this.handleSearchClicked}>
          <SearchOutlined />
        </IconButton>
        {showSearch && (
          <FormattedMessage id="LABELS.SEARCH_HERE">
            {placeholder => (
              <InputBase
                className={searchInput}
                type="search"
                fullWidth={true}
                placeholder={placeholder.toString()}
                value={searchTerm}
                onChange={this.onChange}
                onKeyPress={preventSubmit}
                name="searchTerm"
              />
            )}
          </FormattedMessage>
        )}
      </div>
    );
  }
}

export const ExpandableSearchComponent = withStyles(styles)(ExpandableSearch);
