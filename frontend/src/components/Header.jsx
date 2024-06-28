function Header() {
  return (
    <div className="w-full h-[85px] bg-green-50 flex justify-between fixed items-center px-[80px]">
      <div className="flex gap-3">
        <p>Explore recipes</p>
        <p>Favourite</p>
        <p>Meal plans</p>
      </div>
      <div>Fresh Feast</div>
      <div className="flex gap-3">
        <div>search bar</div>
        <div className="flex gap-3">
          <p>login</p>
          <p>signup</p>
        </div>
      </div>
    </div>
  )
}

export default Header
