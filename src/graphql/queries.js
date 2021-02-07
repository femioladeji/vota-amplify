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
      owner
      questions {
        items {
          id
          pollId
          question
          description
          status
          options
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
        owner
        questions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const pollByLink = /* GraphQL */ `
  query PollByLink(
    $link: String
    $sortDirection: ModelSortDirection
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollByLink(
      link: $link
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        owner
        questions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPollQuestion = /* GraphQL */ `
  query GetPollQuestion($id: ID!) {
    getPollQuestion(id: $id) {
      id
      pollId
      question
      description
      status
      options
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPollQuestions = /* GraphQL */ `
  query ListPollQuestions(
    $filter: ModelPollQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollId
        question
        description
        status
        options
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
