export default function initItemsController(db) {
  const index = async (request, response) => {
    try {
      const items = await db.Item.findAll();
      console.log(items);
      response.render('items/index', { items });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
  };
}
