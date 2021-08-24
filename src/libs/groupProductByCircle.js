export default function groupProductByCircle(data){
  let constructed = []
  for (let item of data) {
    if (constructed.length === 0) {
      constructed = [
        {
          circle: {
            id: item.circle?.id,
            name: item.circle?.name,
            image: item.circle?.profilePicture?.formats?.thumbnail.url,
            website: item.circle?.website
          },
          products: [item]
        }
      ]
    } else {
      for (let [index, group] of constructed.entries()) {
        if (group.circle.id === item.circle?.id) {
          const joinProduct = [...group.products, item]
          const newGroupData = {
            circle: { ...group.circle },
            products: joinProduct
          }
          constructed.splice(index, 1, newGroupData)
        } else {
          constructed = [
            ...constructed,
            {
              circle: {
                id: item.circle?.id,
                name: item.circle?.name,
                image: item.circle?.profilePicture?.formats?.thumbnail.url,
                website: item.circle?.website
              },
              products: [item]
            }
          ]
        } // end if circle contains same data
      } // end group loop
    } // end if contructed is null
  }
  return constructed
}