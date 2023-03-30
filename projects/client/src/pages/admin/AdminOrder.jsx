import { Box } from "@chakra-ui/react"

const AdminOrder = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} w="100%">
      <Box w="70%" h="100vh" p="16px" bgColor={"gray.100"}>
        {/* <Grid templateColumns={"repeat(3, 1fr)"} gap={"2"} mt="52px">
          {renderMenu()}
        </Grid> */}
      </Box>

      {/* <ModalMenu
        isOpen={order}
        onClose={() => setOrder(null)}
        header={order?.food_name}
        val={order}
      /> */}
    </Box>
  )
}

export default AdminOrder
