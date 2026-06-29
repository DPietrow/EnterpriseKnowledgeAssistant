export default function UserBubble({ message }) {

  return (

    <div className="flex justify-end">

      <div
        className="
        max-w-2xl
        rounded-2xl
        bg-blue-600
        px-5
        py-3
        text-white
        shadow
        "
      >

        {message.content}

      </div>

    </div>

  );

}