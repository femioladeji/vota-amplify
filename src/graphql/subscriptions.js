/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($owner: String!) {
    onCreatePoll(owner: $owner) {
      id
      name
      description
      startDate
      endDate
      publishStatus
      isPublic
      isAnonymous
      link
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
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($owner: String!) {
    onUpdatePoll(owner: $owner) {
      id
      name
      description
      startDate
      endDate
      publishStatus
      isPublic
      isAnonymous
      link
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
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($owner: String!) {
    onDeletePoll(owner: $owner) {
      id
      name
      description
      startDate
      endDate
      publishStatus
      isPublic
      isAnonymous
      link
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
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePollQuestion = /* GraphQL */ `
  subscription OnCreatePollQuestion {
    onCreatePollQuestion {
      id
      pollId
      question
      description
      status
      options
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePollQuestion = /* GraphQL */ `
  subscription OnUpdatePollQuestion {
    onUpdatePollQuestion {
      id
      pollId
      question
      description
      status
      options
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePollQuestion = /* GraphQL */ `
  subscription OnDeletePollQuestion {
    onDeletePollQuestion {
      id
      pollId
      question
      description
      status
      options
      createdAt
      updatedAt
    }
  }
`;
