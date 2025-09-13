import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import Link from 'next/link';


type BlockLongTextRenderProps = {
  content: BlocksContent | string;
};


const BlockLongTextRender = ({ content }: BlockLongTextRenderProps) => {
  // Ensure BlocksRenderer receives the correct type (RootNode[] / BlocksContent)
  let blocksContent: BlocksContent;
  if (typeof content === 'string') {
    try {
      blocksContent = JSON.parse(content) as BlocksContent;
    } catch {
      // Fallback to empty content if parsing fails
      blocksContent = [];
    }
  } else {
    blocksContent = content;
  }

  return (
    <BlocksRenderer
      content={blocksContent}
      blocks={{
        // You can use the default components to set class names...
        paragraph: ({ children }) => <p className="text-neutral-500 max-w-prose">{children}</p>,
        // ...or point to a design system
        // For links, you may want to use the component from your router or framework
        link: ({ children, url }) => <Link className='underline text-green-400' href={url}>{children}</Link>,
        list: ({ children, format }) => {
          switch (format) {
            case 'ordered':
              return <ol className="list-decimal pl-6">{children}</ol>;
            case 'unordered':
              return <ul className="list-disc pl-6 text-gray-600">{children}</ul>;
            default:
              return <div>{children}</div>;
          }
        },

        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h2 className="font-bold text-xl mb-4">{children}</h2>;
            case 2:
              return <h3 className="font-semibold text-lg mb-4">{children}</h3>;
            case 6:
              return <h6 className="font-medium text-green-500 text-base mb-4">{children}</h6>;

            default:
              return <div>{children}</div>;
          }
        }
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <span className="italic">{children}</span>,
        code: ({ children }) => <code className="bg-gray-500 text-fuchsia-300 rounded-md px-2 py-1 font-mono text-xs">{children}</code>,
      }}
    />
  );
};

export default BlockLongTextRender;