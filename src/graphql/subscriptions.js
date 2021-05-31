/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInvitation = /* GraphQL */ `
  subscription OnCreateInvitation($owner: String) {
    onCreateInvitation(owner: $owner) {
      id
      pollId
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateInvitation = /* GraphQL */ `
  subscription OnUpdateInvitation($owner: String) {
    onUpdateInvitation(owner: $owner) {
      id
      pollId
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteInvitation = /* GraphQL */ `
  subscription OnDeleteInvitation($owner: String) {
    onDeleteInvitation(owner: $owner) {
      id
      pollId
      email
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($owner: String) {
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
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($owner: String) {
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
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($owner: String) {
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
export const onCreatePollQuestion = /* GraphQL */ `
  subscription OnCreatePollQuestion($owner: String) {
    onCreatePollQuestion(owner: $owner) {
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
export const onUpdatePollQuestion = /* GraphQL */ `
  subscription OnUpdatePollQuestion($owner: String) {
    onUpdatePollQuestion(owner: $owner) {
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
export const onDeletePollQuestion = /* GraphQL */ `
  subscription OnDeletePollQuestion($owner: String) {
    onDeletePollQuestion(owner: $owner) {
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
