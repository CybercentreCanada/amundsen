import {
  SubmitSearchResource,
  SubmitSearchResourceRequest,
} from 'ducks/search/types';
import { FilterOptions, ResourceType, SearchFilterInput } from 'interfaces';

/* ACTION TYPES */
export enum UpdateSearchFilter {
  REQUEST = 'amundsen/search/filter/UPDATE_SEARCH_FILTER_REQUEST',
}
export type UpdateFilterPayload = {
  searchFilters: SearchFilterInput[];
};
export interface UpdateFilterRequest {
  payload: UpdateFilterPayload;
  type: UpdateSearchFilter.REQUEST;
}

/* ACTIONS */
export function updateFilterByCategory({
  searchFilters,
}: UpdateFilterPayload): UpdateFilterRequest {
  return {
    payload: {
      searchFilters,
    },
    type: UpdateSearchFilter.REQUEST,
  };
}

/* REDUCER TYPES */
export interface FilterReducerState {
  [ResourceType.dashboard]?: ResourceFilterReducerState;
  [ResourceType.table]?: ResourceFilterReducerState;
  [ResourceType.feature]?: ResourceFilterReducerState;
}

export interface ResourceFilterReducerState {
  [categoryId: string]: string | FilterOptions;
}

/* REDUCER */
export const initialTableFilterState = {};
export const initialDashboardFilterState = {};
export const initialFeatureFilterState = {};

export const initialFilterState: FilterReducerState = {
  [ResourceType.dashboard]: initialDashboardFilterState,
  [ResourceType.table]: initialTableFilterState,
  [ResourceType.feature]: initialFeatureFilterState,
};

export default function reducer(
  state: FilterReducerState = initialFilterState,
  action
): FilterReducerState {
  switch (action.type) {
    case SubmitSearchResource.REQUEST:
      const { payload } = <SubmitSearchResourceRequest>action;
      if (payload.resource && payload.resourceFilters) {
        return {
          ...state,
          [payload.resource]: payload.resourceFilters,
        };
      }
      return state;
    default:
      return state;
  }
}
