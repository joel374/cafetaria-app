import { Box, Grid, Image } from "@chakra-ui/react"
import { axiosInstance } from "../../api"
import { useEffect, useState } from "react"
import MenuItem from "../../components/MenuCard"
import ModalMenu from "../../components/ModalMenu"

const Menu = () => {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)

  const fetchMenu = async () => {
    try {
      const response = await axiosInstance.get("/menu")
      console.log(response.data.data)
      setMenu(response.data.data)
      setLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  const renderMenu = () => {
    return Array.from(loading && menu).map((val) => {
      return (
        <MenuItem
          image_url={val?.Images[0]?.image_url}
          menu_name={val.food_name}
          price={val.price}
          onClick={() => setOrder(val)}
        />
      )
    })
  }

  useEffect(() => {
    fetchMenu()
  }, [])
  return (
    <Box display={"flex"} justifyContent={"center"} w="100%">
      <Box w="70%" h="100vh" p="16px" bgColor={"gray.100"}>
        <Grid templateColumns={"repeat(3, 1fr)"} gap={"2"} mt="52px">
          {renderMenu()}
        </Grid>
      </Box>

      <ModalMenu isOpen={order} onClose={() => setOrder(null)} val={order} />
    </Box>
  )
}

export default Menu
