export const PasswordStrengthMeter = ({ password }) => {
    const getStrength = (pass) => {
        let score = 0;
        if (!pass) return 0;
        if (pass.length > 8) score++;
        if (pass.match(/[a-z]/)) score++;
        if (pass.match(/[A-Z]/)) score++;
        if (pass.match(/\d+/)) score++;
        if (pass.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) score++;
        return score;
    };
    
    const strength = getStrength(password);
    const strengthLabels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const strengthColors = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    return (
        <div className="mt-2">
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`transition-all duration-300 ${strengthColors[strength]}`} style={{ width: `${(strength / 5) * 100}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Strength: {strengthLabels[strength]}</p>
        </div>
    );
};