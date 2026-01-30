interface Props {
  setCreateDialogOpen: (open: boolean) => void
  setPage: (page: number) => void
}

export function handleCrearUser({
  setCreateDialogOpen,
  setPage,
}: Props) {
  return () => {
    //   API 

    setCreateDialogOpen(false)
    setPage(1)
  }
}
