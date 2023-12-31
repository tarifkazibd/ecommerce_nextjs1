export default async function handler(req, res) {
  try {
    await res.revalidate("/shop");

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
