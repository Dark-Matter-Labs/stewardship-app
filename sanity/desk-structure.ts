import { MdHome, MdPerson, MdDescription, MdAssignment } from 'react-icons/md'

export const Structure = (S: any, context : any)  => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Spaces')
        .icon(MdHome)
        .child(
          S.documentTypeList('space')
            .title('Spaces')
            .child((spaceId: string) =>
              S.documentList()
                .title('Inside this Space')
                .filter(`_type == "actant" && space._ref == "${spaceId}"`)
                .child((actantId: string) =>
                  S.documentList()
                    .title('Actants')
                    .filter(`_type == "actant" && space._ref == "${spaceId}"`)
                )
            )
        ),
      
      S.listItem()
        .title('Actants')
        .icon(MdPerson)
        .child(
          S.documentList()
            .title('Actants')
            .filter('_type == "actant"')
            .child((actantId: string) =>
              S.documentList()
                .title('Agents')
                .filter(`_type == "agent" && actants[]._ref == "${actantId}"`)
            )
        ),

      S.listItem()
        .title('Reports')
        .icon(MdDescription)
        .child(
          S.documentList()
            .title('Reports')
            .filter('_type == "report"')
            .child((reportId: string) =>
              S.documentList()
                .title('Reports by Clause')
                .filter(`_type == "report" && clause._ref == "${reportId}"`)
            )
        ),

      S.listItem()
        .title('Clauses')
        .icon(MdAssignment)
        .child(
          S.documentList()
            .title('Clauses')
            .filter('_type == "clause"')
        ),
    ])
}
