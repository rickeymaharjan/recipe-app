import CollectionCard from "./CollectionCard"

const CollectionList = ({ collections }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] gap-10">
      {collections &&
        collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
    </div>
  )
}

export default CollectionList
