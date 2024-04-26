import { Card, cn, Input, Select, SelectItem } from '@nextui-org/react'
import { BlogType } from '@prisma/client'
import { Editor } from '@tinymce/tinymce-react'
import { Editor as TinyMCEEditor } from 'tinymce';
import React, { useRef } from 'react'

interface Props {
  className?: string
  types: BlogType[]
}

const Basic = (props: Props) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Card className={cn("p-2 grid grid-cols-1 md:grid-cols-3 gap-3", props.className)}>
      <Input label="Title" className='md:col-span-3' />
      <div className='md:col-span-3'>
        <Editor
          apiKey='k6phizol048u0brh9q5tx0xp2wcs0sxfp7vp160roa9s3odb'
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 200,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
      <Select label="Type" selectionMode='single'>
        {props.types.map((item)=>(
          <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
        ))}
      </Select>
      <Select label="Status" selectionMode='single'>
          <SelectItem key={0} value={0}>{'Draft'}</SelectItem>
          <SelectItem key={1} value={1}>{'Release'}</SelectItem>
      </Select>
    </Card>
  )
}

export default Basic