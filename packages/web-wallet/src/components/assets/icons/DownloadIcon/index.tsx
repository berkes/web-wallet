import React, {FC, ReactElement} from 'react'

export type Props = {
  width?: number
  height?: number
  color?: string
}

const DocumentIcon: FC<Props> = (props: Props): ReactElement => {
  const {width = 14, height = 18, color = '#0B81FF'} = props // TODO color

  return (
    <div style={{width, height, display: 'flex'}}>
      <svg width="100%" height="100%" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Icon/download">
          <g id="Icon/share">
            <path
              d="M9.37061 9.04912L7.59757 10.8613L7.59757 0.996098C7.59757 0.722055 7.38031 0.500003 7.11218 0.500003C6.84405 0.500003 6.62679 0.722055 6.62679 0.996098L6.62679 10.8613L4.85375 9.04912C4.75901 8.95228 4.63475 8.90386 4.51049 8.90386C4.38623 8.90386 4.26216 8.95228 4.16722 9.04912C3.97753 9.2428 3.97753 9.55692 4.16722 9.7506L6.76833 12.4093C6.85648 12.4994 6.97802 12.5551 7.11218 12.5551C7.24634 12.5551 7.36788 12.4994 7.45603 12.4093L10.057 9.7506C10.2466 9.55673 10.2466 9.2426 10.057 9.04912C9.86726 8.85525 9.5601 8.85525 9.37061 9.04912Z"
              fill={color}
            />
            <path
              d="M9.37061 9.04912L7.59757 10.8613L7.59757 0.996098C7.59757 0.722055 7.38031 0.500003 7.11218 0.500003C6.84405 0.500003 6.62679 0.722055 6.62679 0.996098L6.62679 10.8613L4.85375 9.04912C4.75901 8.95228 4.63475 8.90386 4.51049 8.90386C4.38623 8.90386 4.26216 8.95228 4.16722 9.04912C3.97753 9.2428 3.97753 9.55692 4.16722 9.7506L6.76833 12.4093C6.85648 12.4994 6.97802 12.5551 7.11218 12.5551C7.24634 12.5551 7.36788 12.4994 7.45603 12.4093L10.057 9.7506C10.2466 9.55673 10.2466 9.2426 10.057 9.04912C9.86726 8.85525 9.5601 8.85525 9.37061 9.04912Z"
              fill={color}
            />
          </g>
          <g id="Icon/share_2">
            <path
              d="M12.1128 6.03163H8.91722C8.64909 6.03163 8.43183 6.25368 8.43183 6.52773C8.43183 6.80177 8.64909 7.02382 8.91722 7.02382H12.1128C12.2734 7.02382 12.4041 7.15737 12.4041 7.32148V16.2101C12.4041 16.3742 12.2734 16.5078 12.1128 16.5078H1.88702C1.72645 16.5078 1.59578 16.3742 1.59578 16.2101V7.32148C1.59578 7.15737 1.72645 7.02382 1.88702 7.02382H5.08264C5.35077 7.02382 5.56803 6.80177 5.56803 6.52773C5.56803 6.25368 5.35077 6.03163 5.08264 6.03163H1.88702C1.19116 6.03163 0.625 6.61028 0.625 7.32148V16.2101C0.625 16.9213 1.19116 17.5 1.88702 17.5H12.1128C12.8087 17.5 13.3749 16.9213 13.3749 16.2101V7.32148C13.3749 6.61028 12.8087 6.03163 12.1128 6.03163Z"
              fill={color}
            />
            <path
              d="M12.1128 6.03163H8.91722C8.64909 6.03163 8.43183 6.25368 8.43183 6.52773C8.43183 6.80177 8.64909 7.02382 8.91722 7.02382H12.1128C12.2734 7.02382 12.4041 7.15737 12.4041 7.32148V16.2101C12.4041 16.3742 12.2734 16.5078 12.1128 16.5078H1.88702C1.72645 16.5078 1.59578 16.3742 1.59578 16.2101V7.32148C1.59578 7.15737 1.72645 7.02382 1.88702 7.02382H5.08264C5.35077 7.02382 5.56803 6.80177 5.56803 6.52773C5.56803 6.25368 5.35077 6.03163 5.08264 6.03163H1.88702C1.19116 6.03163 0.625 6.61028 0.625 7.32148V16.2101C0.625 16.9213 1.19116 17.5 1.88702 17.5H12.1128C12.8087 17.5 13.3749 16.9213 13.3749 16.2101V7.32148C13.3749 6.61028 12.8087 6.03163 12.1128 6.03163Z"
              fill={color}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default DocumentIcon