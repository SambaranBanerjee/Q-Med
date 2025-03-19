const pic = {
    name: 'Healthy Woman',
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DCI0Qw4CukTKBkBjzJ1cEw6yxPl3p7J-zA&s"
};

export default function Image(){
    return(
        <div>
            <img
                className="avatar"
                src={pic.imgUrl}
                alt={'picture of' + ' ' + pic.name }
                style={
                    {
                        width: '100%',
                        height: '100%',
                        zIndex:-1
                    }
                }
                />
        </div>
    )
}