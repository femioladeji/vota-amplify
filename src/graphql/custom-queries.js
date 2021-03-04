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
      nextToken
    }
  }
`
