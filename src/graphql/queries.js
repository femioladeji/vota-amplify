/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
      id
      name
      description
      startDate
      endDate
      publishStatus
      isPublic
      isAnonymous
      link
      createdAt
      updatedAt
    }
  }
`;
export const listPolls = /* GraphQL */ `
  query ListPolls(
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        startDate
        endDate
        publishStatus
        isPublic
        isAnonymous
        link
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
