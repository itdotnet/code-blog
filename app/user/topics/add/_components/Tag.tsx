import { ChevronLeftIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Autocomplete, AutocompleteItem, Button, Card, cn } from '@nextui-org/react'
import { BlogTag } from '@prisma/client';
import React, { useState } from 'react'

interface Props {
    prev: () => void;
    className?: string;
    tags: BlogTag[];
}

const Tag = (props: Props) => {
    const [selectedValues, setSelectedValues] = React.useState<BlogTag[]>([]);
    const [tags, setTags] = useState(props.tags);

    const onSelectionChange = (id: any) => {
        const tag=tags.find(x=>x.id==id);
        if(tag!=undefined)
            setSelectedValues([...selectedValues,tag]);
        const index = tags.findIndex(x => x.id == id);
        if (index >= 0)
            setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    };

    const onRemoveTag = (tag: BlogTag,index:number) => {
        setSelectedValues([...selectedValues.slice(0, index), ...selectedValues.slice(index + 1)]);
        setTags([...tags, tag]);
    }

    return (
        <Card className={cn('p-3', props.className)}>
            <Autocomplete
                variant="bordered"
                defaultItems={tags}
                placeholder="Select Tags"
                className="max-w-xs"
                onSelectionChange={onSelectionChange}
            //onInputChange={onInputChange}
            >
                {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
            </Autocomplete>

            <div className="flex gap-3 mt-3">
                {selectedValues.map((tag, index) =>
                    <div key={tag.id} className='px-3 py-4 bg-blue-600 text-white relative min-w-36 text-center'>
                        <Button onClick={() => onRemoveTag(tag,index)} className='bg-transparent absolute -top-2 -left-7'><XMarkIcon className='w-4 text-white' /></Button>
                        <span>{tag.name}</span>
                    </div>
                )}
            </div>

            <div className='flex justify-center gap-3'>
                <Button color='primary' onClick={props.prev} startContent={<ChevronLeftIcon className='w-6' />}>Previous</Button>
                <Button color='secondary' endContent={<PlusCircleIcon className='w-6' />}>Submit</Button>
            </div>
        </Card>
    )
}

export default Tag