import { ChevronLeftIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Autocomplete, AutocompleteItem, Button, Card, cn } from '@nextui-org/react'
import { BlogTag } from '@prisma/client';
import React, { useState, useEffect } from 'react'

interface Props {
    prev: () => void;
    className?: string;
    tags: BlogTag[];
    selectedTags: BlogTag[];
    setSelectedTags: (tags: BlogTag[]) => void;
    savedTags?: BlogTag[];
    setSavedTags?: (tags: BlogTag[]) => void;
}

const Tag = (props: Props) => {
    const [tags, setTags] = useState(props.tags);

    useEffect(() => {
        const savedTagIds=props.savedTags?.map(item=>item.id);
        setTags(tags.filter(( item ) => !savedTagIds?.includes(item.id)));
    }, [])

    const onSelectionChange = (id: any) => {
        const tag = tags.find(x => x.id == id);
        if (tag != undefined) {
            props.setSelectedTags([...props.selectedTags, tag]);
            //setSelectedValues([...selectedValues,tag]);
        }
        const index = tags.findIndex(x => x.id == id);
        if (index >= 0)
            setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    };

    const onRemoveTag = (tag: BlogTag, index: number) => {
        props.setSelectedTags([...props.selectedTags.slice(0, index), ...props.selectedTags.slice(index + 1)]);
        setTags([...tags, tag]);
    }

    const onRemoveTagFromSavedTag = (tag: BlogTag, index: number) => {
        props.setSavedTags!([...props.savedTags!.slice(0, index), ...props.savedTags!.slice(index + 1)]);
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
                {props.savedTags!! && props.savedTags.map((tag, index) =>
                    <div key={index} className='px-3 py-4 bg-blue-600 text-white relative min-w-36 text-center'>
                        <Button onClick={() => onRemoveTagFromSavedTag(tag, index)} className='bg-transparent absolute -top-2 -left-7'><XMarkIcon className='w-4 text-white' /></Button>
                        <span>{tag.name}</span>
                    </div>
                )}
                {props.selectedTags.map((tag, index) =>
                    <div key={index} className='px-3 py-4 bg-blue-600 text-white relative min-w-36 text-center'>
                        <Button onClick={() => onRemoveTag(tag, index)} className='bg-transparent absolute -top-2 -left-7'><XMarkIcon className='w-4 text-white' /></Button>
                        <span>{tag.name}</span>
                    </div>
                )}
            </div>

            <div className='flex justify-center gap-3'>
                <Button color='primary' onClick={props.prev} startContent={<ChevronLeftIcon className='w-6' />}>Previous</Button>
                <Button type='submit' color='secondary' endContent={<PlusCircleIcon className='w-6' />}>Save</Button>
            </div>
        </Card>
    )
}

export default Tag