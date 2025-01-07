import Image from "next/image";

interface CardProps {
	title: string;
	description: string;
	imageUrl?: string;
	onClick?: () => void;
	className?: string;
	children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
	title,
	description,
	imageUrl,
	onClick,
	className = "",
	children,
}) => {
	return (
		<div
			className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
			onClick={onClick}
		>
			{imageUrl && (
				<div className="relative w-full h-48">
					<Image
						src={imageUrl}
						alt={title}
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			<div className="p-6">
				<h3 className="text-xl font-semibold text-gray-800 mb-2">
					{title}
				</h3>

				<p className="text-gray-600 mb-4">{description}</p>

				{children && <div className="mt-4">{children}</div>}
			</div>
		</div>
	);
};

export default Card;

// Example usage:
/*
  import Card from './Card';
  
  const ExamplePage = () => {
    return (
      <div className="p-4">
        <Card
          title="Getting Started with Next.js"
          description="Learn how to build scalable applications with Next.js, TypeScript, and Tailwind CSS."
          imageUrl="/images/nextjs.jpg"
          onClick={() => console.log('Card clicked')}
          className="max-w-sm"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Read More
          </button>
        </Card>
      </div>
    );
  };
  */
