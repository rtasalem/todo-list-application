import Icon from './Icon';

const IconBar = ({ icons = [], className }) => {
  return (
    <div className={`icon-bar ${className || ''}`}>
      {icons.map((IconComponent, index) => (
        <Icon key={index} icon={IconComponent} className="icon" />
      ))}
    </div>
  );
};

export default IconBar;
