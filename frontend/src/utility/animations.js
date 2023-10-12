
// Animation Class to keep types / consistent and allow for people to make new ones on the fly
/**
 * Animation class should represent key frames for an animation
 * 
 */
export class Animation {
    /**
    * Pass in an object containing the following fields (by default they will return an animation that fades in and out)
    * @param {string} spawn - What to do first thing
    * @param {string} move_in - What to do when we begin being animated
    * @param {string} rendered - What to do after we have animated
    * @param {string} move_out - What to do when we want to 'undo' the animation
    * @param {string} despawn - Deconstructor
    * 
    * @example 
    *   const leftThenRight = new Animation({
    *       spawn: 'block -translate-x-full', 
    *       move_in: 'translate-x-0'
    *       move_out: '-translate-x-full',
    *       despawn: 'hidden'
    *   })
    */
    constructor(anim=null){ // we pad incase css classes are being added into a longer string
        const {spawn='block opacity-0',move_in='opacity-100',rendered='',move_out='opacity-0',despawn='hidden'} = anim; // deconstruct anim object
        this.spawn    = spawn.padStart(spawn.length+1).padEnd(spawn+length+2)
        this.move_in  = move_in.padStart(move_in.length+1).padEnd(move_in+length+2)
        this.rendered = rendered.padStart(rendered.length+1).padEnd(rendered+length+2) 
        this.move_out = move_out.padStart(move_out.length+1).padEnd(move_out+length+2) 
        this.despawn  = despawn.padStart(despawn.length+1).padEnd(despawn+length+2) 
    }
}

// Left Slide animation
/**
 * Animate objects to make them appear like they are coming in from the left (and leave to the left)
 */
export const leftSlide = new Animation({ 
    spawn:'block -translate-x-full', 
    move_in:'-translate-x-0', 
    rendered: '',
    move_out:'-translate-x-full', 
    despawn: 'hidden' 
})

// Right Slide animation
/**
 * Animate objects to make them appear like they are coming in from the right (and leave to the right)
 */
export const rightSlide = new Animation ({ 
    spawn:'block translate-x-full', 
    move_in:'translate-x-0 ', 
    rendered: '',
    move_out:'translate-x-full ', 
    despawn: 'hidden' 
})

// Top Slide animation
/**
 * Animate objects to make them appear like they are coming in from the top (and leave to the top)
 */
export const topSlide = new Animation({ 
    spawn:'block -translate-y-full', 
    move_in:'translate-y-0 opacity-100', 
    rendered: '',
    move_out:'-translate-y-full opacity-0', 
    despawn: 'hidden' 
})