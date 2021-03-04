/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPoll = /* GraphQL */ `
  mutation CreatePoll(
    $input: CreatePollInput!
    $condition: ModelPollConditionInput
  ) {
    createPoll(input: $input, condition: $condition) {
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
export const updatePoll = /* GraphQL */ `
  mutation UpdatePoll(
    $input: UpdatePollInput!
    $condition: ModelPollConditionInput
  ) {
    updatePoll(input: $input, condition: $condition) {
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
export const deletePoll = /* GraphQL */ `
  mutation DeletePoll(
    $input: DeletePollInput!
    $condition: ModelPollConditionInput
  ) {
    deletePoll(input: $input, condition: $condition) {
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
export const createPollQuestion = /* GraphQL */ `
  mutation CreatePollQuestion(
    $input: CreatePollQuestionInput!
    $condition: ModelPollQuestionConditionInput
  ) {
    createPollQuestion(input: $input, condition: $condition) {
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
export const updatePollQuestion = /* GraphQL */ `
  mutation UpdatePollQuestion(
    $input: UpdatePollQuestionInput!
    $condition: ModelPollQuestionConditionInput
  ) {
    updatePollQuestion(input: $input, condition: $condition) {
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
export const deletePollQuestion = /* GraphQL */ `
  mutation DeletePollQuestion(
    $input: DeletePollQuestionInput!
    $condition: ModelPollQuestionConditionInput
  ) {
    deletePollQuestion(input: $input, condition: $condition) {
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
export const castPollVote = /* GraphQL */ `
  mutation CastPollVote(
    $input: CreatePollVoteInput!
    $condition: ModelPollVoteConditionInput
  ) {
    castPollVote(input: $input, condition: $condition) {
      id
      email
      fullname
      pollId
      date
      choices {
        questionId
        option
      }
      confirmed
      createdAt
      updatedAt
    }
  }
`;
