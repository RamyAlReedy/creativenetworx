Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {

        var startClickInside = false;
        var isVisible = function () {
            !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )
        }

        var isVisible = function (elem) {
            if (elem && elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) {
                return true;
            }
            return false;
        }

        var mouseDownListener = function () {
            document.addEventListener('mousedown', function () {
                if (el.contains(event.target)) {
                    startClickInside = true;
                }
                else {
                    startClickInside = false;
                }
            });
        }

        var outsideClickListener = function() {
            if (!startClickInside && !el.contains(event.target) && isVisible(el)) {
              binding.value();
            }
        }

        var removeClickListener = function () {
            document.removeEventListener('mousedown', mouseDownListener);
            document.removeEventListener('mouseup', outsideClickListener);
            startClickInside = false;
        }

        document.addEventListener('mousedown', mouseDownListener);
        document.addEventListener('mouseup', outsideClickListener);
    }
});

Vue.mixin( {
    data: function () {
        return {
            test_sample_color_palatte: [
                '#1e2493', '#1e4b20', '#d7782d', '#461393', '#8c1a11', '#ea3323', '#4aa22e',
                '#5456b5', '#468547', '#e29e57', '#703fb4', '#ad4c3e', '#ec6331', '#91c148',
                '#9495d5', '#80bb80', '#eec294', '#a580d4', '#cf9281', '#f2a84a', '#dacb72',
                '#d7d7f2', '#caecc6', '#f9e5d0', '#dac8f2', '#f0d5c9', '#fbe772', '#e7c4b4',
            ],
            ctrl_w_sample_color_palatte: [
                '#5456b5', '#468547', '#e29e57', '#703fb4', '#ad4c3e', '#ec6331', '#91c148',
                '#9495d5', '#80bb80', '#eec294', '#a580d4', '#cf9281', '#f2a84a', '#dacb72',
                '#d7d7f2', '#caecc6', '#f9e5d0', '#dac8f2', '#f0d5c9', '#fbe772', '#e7c4b4',
                '#1e2493', '#1e4b20', '#d7782d', '#461393', '#8c1a11', '#ea3323', '#4aa22e',
            ],
            ctrl_wo_sample_color_palatte: [
                '#9495d5', '#80bb80', '#eec294', '#a580d4', '#cf9281', '#f2a84a', '#dacb72',
                '#d7d7f2', '#caecc6', '#f9e5d0', '#dac8f2', '#f0d5c9', '#fbe772', '#e7c4b4',
                '#1e2493', '#1e4b20', '#d7782d', '#461393', '#8c1a11', '#ea3323', '#4aa22e',
                '#5456b5', '#468547', '#e29e57', '#703fb4', '#ad4c3e', '#ec6331', '#91c148',
            ],
            rate_color_palatte: [
                '#5456b5', '#468547', '#e29e57', '#703fb4', '#ad4c3e', '#ec6331', '#91c148',
                '#9495d5', '#80bb80', '#eec294', '#a580d4', '#cf9281', '#f2a84a', '#dacb72',
                '#d7d7f2', '#caecc6', '#f9e5d0', '#dac8f2', '#f0d5c9', '#fbe772', '#e7c4b4',
                '#1e2493', '#1e4b20', '#d7782d', '#461393', '#8c1a11', '#ea3323', '#4aa22e',
            ],
            condition_set_color_palatte: [
                '#d7d7f2', '#caecc6', '#f9e5d0', '#dac8f2', '#f0d5c9', '#fbe772', '#e7c4b4',
                '#1e2493', '#1e4b20', '#d7782d', '#461393', '#8c1a11', '#ea3323', '#4aa22e',
                '#5456b5', '#468547', '#e29e57', '#703fb4', '#ad4c3e', '#ec6331', '#91c148',
                '#9495d5', '#80bb80', '#eec294', '#a580d4', '#cf9281', '#f2a84a', '#dacb72',
            ],
            replicate_color_palatte: [
                '#1e2493', '#1e4b20', '#d7782d', '#461393', '#8c1a11', '#ea3323', '#4aa22e',
                '#5456b5', '#468547', '#e29e57', '#703fb4', '#ad4c3e', '#ec6331', '#91c148',
                '#9495d5', '#80bb80', '#eec294', '#a580d4', '#cf9281', '#f2a84a', '#dacb72',
                '#d7d7f2', '#caecc6', '#f9e5d0', '#dac8f2', '#f0d5c9', '#fbe772', '#e7c4b4',
            ],
        }
    },
});

var layouts= [{
    id: 1,
    name: 'Plate.Layout.1',
    size: 96,
    platform: 1,
    dispensary: 'BSD',
    wells: JSON.parse(
        "[{\"id\":1,\"content\":{\"role\":\"test_sample\",\"test_sample\":1,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":2,\"content\":{\"role\":\"test_sample\",\"test_sample\":2,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":3,\"content\":{\"role\":\"test_sample\",\"test_sample\":3,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":4,\"content\":{\"role\":\"test_sample\",\"test_sample\":4,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":5,\"content\":{\"role\":\"test_sample\",\"test_sample\":5,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":6,\"content\":{\"role\":\"test_sample\",\"test_sample\":6,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":7,\"content\":{\"role\":\"test_sample\",\"test_sample\":7,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":8,\"content\":{\"role\":\"test_sample\",\"test_sample\":8,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":9,\"content\":{\"role\":\"test_sample\",\"test_sample\":9,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":10,\"content\":{\"role\":\"empty\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":\"\",\"condition_set\":\"\",\"replicate\":\"\"},\"highlight\":false,\"disable\":false},{\"id\":11,\"content\":{\"role\":\"ctrl_w_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":1,\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":12,\"content\":{\"role\":\"ctrl_w_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":2,\"ctrl_wo_sample\":\"\",\"rate\":1,\"condition_set\":\"1\",\"replicate\":2},\"highlight\":false,\"disable\":false},{\"id\":13,\"content\":{\"role\":\"test_sample\",\"test_sample\":1,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":14,\"content\":{\"role\":\"test_sample\",\"test_sample\":2,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":15,\"content\":{\"role\":\"test_sample\",\"test_sample\":3,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":16,\"content\":{\"role\":\"test_sample\",\"test_sample\":4,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":17,\"content\":{\"role\":\"test_sample\",\"test_sample\":5,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":18,\"content\":{\"role\":\"test_sample\",\"test_sample\":6,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":19,\"content\":{\"role\":\"test_sample\",\"test_sample\":7,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":20,\"content\":{\"role\":\"test_sample\",\"test_sample\":8,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":21,\"content\":{\"role\":\"test_sample\",\"test_sample\":9,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":22,\"content\":{\"role\":\"empty\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":\"\",\"condition_set\":\"\",\"replicate\":\"\"},\"highlight\":false,\"disable\":false},{\"id\":23,\"content\":{\"role\":\"ctrl_w_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":1,\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":24,\"content\":{\"role\":\"ctrl_w_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":2,\"ctrl_wo_sample\":\"\",\"rate\":2,\"condition_set\":2,\"replicate\":2},\"highlight\":false,\"disable\":false},{\"id\":25,\"content\":{\"role\":\"test_sample\",\"test_sample\":1,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":26,\"content\":{\"role\":\"test_sample\",\"test_sample\":2,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":27,\"content\":{\"role\":\"test_sample\",\"test_sample\":3,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":28,\"content\":{\"role\":\"test_sample\",\"test_sample\":4,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":29,\"content\":{\"role\":\"test_sample\",\"test_sample\":5,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":30,\"content\":{\"role\":\"test_sample\",\"test_sample\":6,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":31,\"content\":{\"role\":\"test_sample\",\"test_sample\":7,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":32,\"content\":{\"role\":\"test_sample\",\"test_sample\":8,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":33,\"content\":{\"role\":\"test_sample\",\"test_sample\":9,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":34,\"content\":{\"role\":\"empty\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":\"\",\"condition_set\":\"\",\"replicate\":\"\"},\"highlight\":false,\"disable\":false},{\"id\":35,\"content\":{\"role\":\"ctrl_w_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":1,\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":36,\"content\":{\"role\":\"ctrl_w_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":2,\"ctrl_wo_sample\":\"\",\"rate\":3,\"condition_set\":3,\"replicate\":2},\"highlight\":false,\"disable\":false},{\"id\":37,\"content\":{\"role\":\"test_sample\",\"test_sample\":1,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":38,\"content\":{\"role\":\"test_sample\",\"test_sample\":2,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":39,\"content\":{\"role\":\"test_sample\",\"test_sample\":3,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":40,\"content\":{\"role\":\"test_sample\",\"test_sample\":4,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":41,\"content\":{\"role\":\"test_sample\",\"test_sample\":5,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":42,\"content\":{\"role\":\"test_sample\",\"test_sample\":6,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":43,\"content\":{\"role\":\"test_sample\",\"test_sample\":7,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":44,\"content\":{\"role\":\"test_sample\",\"test_sample\":8,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":45,\"content\":{\"role\":\"test_sample\",\"test_sample\":9,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":46,\"content\":{\"role\":\"empty\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":\"\",\"condition_set\":\"\",\"replicate\":\"\"},\"highlight\":false,\"disable\":false},{\"id\":47,\"content\":{\"role\":\"ctrl_w_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":1,\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":48,\"content\":{\"role\":\"ctrl_w_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":2,\"ctrl_wo_sample\":\"\",\"rate\":4,\"condition_set\":4,\"replicate\":2},\"highlight\":false,\"disable\":false},{\"id\":49,\"content\":{\"role\":\"test_sample\",\"test_sample\":1,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":50,\"content\":{\"role\":\"test_sample\",\"test_sample\":2,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":51,\"content\":{\"role\":\"test_sample\",\"test_sample\":3,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":52,\"content\":{\"role\":\"test_sample\",\"test_sample\":4,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":53,\"content\":{\"role\":\"test_sample\",\"test_sample\":5,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":54,\"content\":{\"role\":\"test_sample\",\"test_sample\":6,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":55,\"content\":{\"role\":\"test_sample\",\"test_sample\":7,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":56,\"content\":{\"role\":\"test_sample\",\"test_sample\":8,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":57,\"content\":{\"role\":\"test_sample\",\"test_sample\":9,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":5,\"condition_set\":5,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":58,\"content\":{\"role\":\"empty\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":\"\",\"condition_set\":\"\",\"replicate\":\"\"},\"highlight\":false,\"disable\":false},{\"id\":59,\"content\":{\"role\":\"ctrl_wo_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":1,\"rate\":\"\",\"condition_set\":\"1\",\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":60,\"content\":{\"role\":\"ctrl_wo_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":2,\"rate\":\"\",\"condition_set\":\"1\",\"replicate\":2},\"highlight\":false,\"disable\":false},{\"id\":61,\"content\":{\"role\":\"test_sample\",\"test_sample\":1,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":62,\"content\":{\"role\":\"test_sample\",\"test_sample\":2,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":63,\"content\":{\"role\":\"test_sample\",\"test_sample\":3,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":64,\"content\":{\"role\":\"test_sample\",\"test_sample\":4,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":65,\"content\":{\"role\":\"test_sample\",\"test_sample\":5,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":66,\"content\":{\"role\":\"test_sample\",\"test_sample\":6,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":67,\"content\":{\"role\":\"test_sample\",\"test_sample\":7,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":68,\"content\":{\"role\":\"test_sample\",\"test_sample\":8,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":69,\"content\":{\"role\":\"test_sample\",\"test_sample\":9,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":6,\"condition_set\":6,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":70,\"content\":{\"role\":\"empty\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":\"\",\"condition_set\":\"\",\"replicate\":\"\"},\"highlight\":false,\"disable\":false},{\"id\":71,\"content\":{\"role\":\"ctrl_wo_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":1,\"rate\":\"\",\"condition_set\":2,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":72,\"content\":{\"role\":\"ctrl_wo_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":2,\"rate\":\"\",\"condition_set\":2,\"replicate\":2},\"highlight\":false,\"disable\":false},{\"id\":73,\"content\":{\"role\":\"test_sample\",\"test_sample\":1,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":74,\"content\":{\"role\":\"test_sample\",\"test_sample\":2,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":75,\"content\":{\"role\":\"test_sample\",\"test_sample\":3,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":76,\"content\":{\"role\":\"test_sample\",\"test_sample\":4,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":77,\"content\":{\"role\":\"test_sample\",\"test_sample\":5,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":78,\"content\":{\"role\":\"test_sample\",\"test_sample\":6,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":79,\"content\":{\"role\":\"test_sample\",\"test_sample\":7,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":80,\"content\":{\"role\":\"test_sample\",\"test_sample\":8,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":81,\"content\":{\"role\":\"test_sample\",\"test_sample\":9,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":7,\"condition_set\":7,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":82,\"content\":{\"role\":\"empty\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":\"\",\"condition_set\":\"\",\"replicate\":\"\"},\"highlight\":false,\"disable\":false},{\"id\":83,\"content\":{\"role\":\"ctrl_wo_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":1,\"rate\":\"\",\"condition_set\":3,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":84,\"content\":{\"role\":\"ctrl_wo_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":2,\"rate\":\"\",\"condition_set\":3,\"replicate\":2},\"highlight\":false,\"disable\":false},{\"id\":85,\"content\":{\"role\":\"test_sample\",\"test_sample\":1,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":86,\"content\":{\"role\":\"test_sample\",\"test_sample\":2,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":87,\"content\":{\"role\":\"test_sample\",\"test_sample\":3,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":88,\"content\":{\"role\":\"test_sample\",\"test_sample\":4,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":89,\"content\":{\"role\":\"test_sample\",\"test_sample\":5,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":90,\"content\":{\"role\":\"test_sample\",\"test_sample\":6,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":91,\"content\":{\"role\":\"test_sample\",\"test_sample\":7,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":92,\"content\":{\"role\":\"test_sample\",\"test_sample\":8,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":93,\"content\":{\"role\":\"test_sample\",\"test_sample\":9,\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":8,\"condition_set\":8,\"replicate\":\"2\"},\"highlight\":false,\"disable\":false},{\"id\":94,\"content\":{\"role\":\"empty\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":\"\",\"rate\":\"\",\"condition_set\":\"\",\"replicate\":\"\"},\"highlight\":false,\"disable\":false},{\"id\":95,\"content\":{\"role\":\"ctrl_wo_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":1,\"rate\":\"\",\"condition_set\":4,\"replicate\":1},\"highlight\":false,\"disable\":false},{\"id\":96,\"content\":{\"role\":\"ctrl_wo_sample\",\"test_sample\":\"\",\"ctrl_w_sample\":\"\",\"ctrl_wo_sample\":2,\"rate\":\"\",\"condition_set\":4,\"replicate\":2},\"highlight\":false,\"disable\":false}]"
    ),
    test_samples: JSON.parse("[{\"id\":1,\"color\":\"#1e2493\"},{\"id\":2,\"color\":\"#1e4b20\"},{\"id\":3,\"color\":\"#d7782d\"},{\"id\":4,\"color\":\"#461393\"},{\"id\":5,\"color\":\"#8c1a11\"},{\"id\":6,\"color\":\"#ea3323\"},{\"id\":7,\"color\":\"#4aa22e\"},{\"id\":8,\"color\":\"#5456b5\"},{\"id\":9,\"color\":\"#468547\"}]"),
    ctrl_w_samples: JSON.parse("[{\"id\":1,\"color\":\"#5456b5\"},{\"id\":2,\"color\":\"#468547\"}]"),
    ctrl_wo_samples: JSON.parse("[{\"id\":1,\"color\":\"#9495d5\"},{\"id\":2,\"color\":\"#80bb80\"}]"),
    rates: JSON.parse("[{\"id\":1,\"color\":\"#661401\"},{\"id\":2,\"color\":\"#921D01\"},{\"id\":3,\"color\":\"#BD2601\"},{\"id\":4,\"color\":\"#E92F02\"},{\"id\":5,\"color\":\"#FF4418\"},{\"id\":6,\"color\":\"#FF6743\"},{\"id\":7,\"color\":\"#FF8A6E\"},{\"id\":8,\"color\":\"#FFAD9A\"}]"),
    condition_sets: JSON.parse("[{\"id\":1,\"color\":\"#d7d7f2\"},{\"id\":2,\"color\":\"#caecc6\"},{\"id\":3,\"color\":\"#f9e5d0\"},{\"id\":4,\"color\":\"#dac8f2\"},{\"id\":5,\"color\":\"#8c1a11\"},{\"id\":6,\"color\":\"#ea3323\"},{\"id\":7,\"color\":\"#e7c4b4\"},{\"id\":8,\"color\":\"#1e2493\"}]"),
    replicates: JSON.parse("[{\"id\":1,\"color\":\"#1e2493\"},{\"id\":2,\"color\":\"#1e4b20\"}]"),
}];

//CREATE APP
var create_app = new Vue({
    el: '#create_app',
    data: {
        edit_mode: true,
        saved_before: false,
        active_tab: 'basic_info',
        layout_mode: 'roles',
        role_value: 'test_sample',
        test_sample_value: 1,
        ctrl_w_sample_value: 1,
        ctrl_wo_sample_value: 1,
        rate_value: 1,
        condition_set_value: 1,
        replicate_value: 1,
        layout: { id: 0, name: 'Layout Name Goes Here', size: 384, platform: 0, dispensary: 0, wells: [], },
        selected_treatments: [],
        selected_wells: [],
        role_colors: {
            test_sample: '#ffcc32',
            ctrl_w_sample: '#ff3302',
            ctrl_wo_sample: '#0066ff',
            empty: '#333',
        },
        role_names: {
            test_sample: 'TSTSAM',
            ctrl_w_sample: 'CTRLSAM',
            ctrl_wo_sample: 'CTRLNOSAM',
        },
        plate_sizes: {
            384: {
                name: '384',
                columns: 24,
                rows: 16,
            },
            96: {
                name: '96',
                columns: 12,
                rows: 8,
            },
            48: {
                name: '48',
                columns: 8,
                rows: 6,
            },
            24: {
                name: '24',
                columns: 6,
                rows: 4,
            },
        },
        well_row_letters: {
            0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P',
        },
        platforms: [
            { id: 1, name: 'IDES', },
            { id: 2, name: 'HDES', },
            { id: 3, name: 'FDES', },
            { id: 4, name: 'IMPS', },
            { id: 5, name: 'FMPS', },
            { id: 6, name: 'IPPS', },
            { id: 7, name: 'HPPS', },
            { id: 8, name: 'FPPS', },
            { id: 9, name: 'ISPS', },
            { id: 10, name: 'HSPS', },
        ],
        test_samples: [],
        ctrl_w_samples: [],
        ctrl_wo_samples: [],
        rates: [],
        condition_sets: [],
        replicates: [],
        current_sample_shade: -0.8,
        current_rate_shade: -0.8,
        sample_color_index: 0,
        test_sample_color_index: 0,
        ctrl_w_sample_color_index: 0,
        ctrl_wo_sample_color_index: 0,
        rate_color_index: 0,
        condition_set_color_index: 0,
        replicate_color_index: 0,
        highlight_by: '',
        highlight_id: 0,
        mousedown: false,
        mousedown_target: null,
        temp_selection: [],
        shiftKeyPressed: false,
        ctrlKeyPressed: false,
        selected_columns: [],
        selected_rows: [],
        last_col_index: -1,
        last_row_index: -1,
        all_wells_selected: false,
        auto_set_data: {
            mode: 'rows',
            starting_number: 1,
            direction: 'across',
        },
        createModalScrollInterval: null,
        createMultiplePluginIntervals: [],
    },
    watch: {
        layout_size: function () {
            this.clear_plate();
            this.layout.wells = [];
            for (var i = 0; i < this.layout.size; i++) {
                var content = null;
                this.layout.wells.push({
                    id: i+1,
                    content: {
                        role: '',
                        test_sample: '',
                        ctrl_w_sample: '',
                        ctrl_wo_sample: '',
                        rate: '',
                        condition_set: '',
                        replicate: '',
                    },
                    highlight: false,
                    disable: false,
                });
            }
        },
        layout: {
            deep: true,
            handler: function (newData) {
                for (var i = 0; i < this.test_samples.length; i++) {
                    if (!this.count_wells_by('test_sample', this.test_samples[i].id)) {
                        this.test_samples.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.test_samples.length) {
                    this.test_sample_color_index = 0;
                }
                for (var i = 0; i < this.ctrl_w_samples.length; i++) {
                    if (!this.count_wells_by('ctrl_w_sample', this.ctrl_w_samples[i].id)) {
                        this.ctrl_w_samples.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.ctrl_w_samples.length) {
                    this.ctrl_w_sample_color_index = 0;
                }
                for (var i = 0; i < this.ctrl_wo_samples.length; i++) {
                    if (!this.count_wells_by('ctrl_wo_sample', this.ctrl_wo_samples[i].id)) {
                        this.ctrl_wo_samples.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.ctrl_wo_samples.length) {
                    this.ctrl_wo_sample_color_index = 0;
                }
                for (var i = 0; i < this.rates.length; i++) {
                    if (!this.count_wells_by('rate', this.rates[i].id)) {
                        this.rates.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.rates.length) {
                    this.rate_color_index = 0;
                }
                for (var i = 0; i < this.condition_sets.length; i++) {
                    if (!this.count_wells_by('condition_set', this.condition_sets[i].id)) {
                        this.condition_sets.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.condition_sets.length) {
                    this.condition_set_color_index = 0;
                }
                for (var i = 0; i < this.replicates.length; i++) {
                    if (!this.count_wells_by('replicate', this.replicates[i].id)) {
                        this.replicates.splice(i, 1);
                        this.$forceUpdate();
                        i--;
                    }
                }
                if (!this.replicates.length) {
                    this.replicate_color_index = 0;
                }
            },
        },
        selected_wells: function () {
            this.selected_columns = [];
            this.selected_rows = [];
            this.last_col_index = -1;
            this.last_row_index = -1;
            this.all_wells_selected = false;
            var columns = {};
            var rows = {};
            var rows_letters_array = Object.values(this.well_row_letters);

            var columns_count = this.plate_sizes[this.layout.size].columns;
            var rows_count = this.plate_sizes[this.layout.size].rows;

            for (var i = 0; i < this.selected_wells.length; i++) {

                var well_location = this.get_well_location(this.selected_wells[i]);

                if (!columns[well_location.column]) {
                    columns[well_location.column] = [];
                }
                columns[well_location.column].push(this.selected_wells[i]);

                if (!rows[well_location.row]) {
                    rows[well_location.row] = [];
                }
                rows[well_location.row].push(this.selected_wells[i]);

            }

            var self = this;

            for (var key of Object.keys(columns)) {
                var id = key;
                var well_ids = [id.toString()];
                for (var i = 0; i < rows_count - 1; i++) {
                    id = parseInt(id) + columns_count;
                    well_ids.push(id.toString());
                }
                var enabled_wells_count = well_ids.reduce(function(n, well_id) {
                    var well = self.getObjectByKey(self.layout.wells, 'id', well_id);
                    return n + (!well.disable);
                }, 0);

                if (columns[key].length === this.plate_sizes[this.layout.size].rows || columns[key].length === enabled_wells_count) {
                    this.selected_columns.push(key - 1);
                    if (Object.keys(columns).length === 1) {
                        this.last_col_index = key - 1;
                    }
                }
            }

            for (var key of Object.keys(rows)) {
                var row_index = rows_letters_array.indexOf(key);
                var id = columns_count * (row_index + 1) - columns_count + 1;
                var well_ids = [id.toString()];
                for (var i = 0; i < columns_count - 1; i++) {
                    id = parseInt(id) + 1;
                    well_ids.push(id.toString());
                }
                var enabled_wells_count = well_ids.reduce(function(n, well_id) {
                    var well = self.getObjectByKey(self.layout.wells, 'id', well_id);
                    return n + (!well.disable);
                }, 0);

                if (rows[key].length === this.plate_sizes[this.layout.size].columns || rows[key].length === enabled_wells_count) {

                    this.selected_rows.push(row_index);
                    if (Object.keys(rows).length === 1) {
                        this.last_row_index = row_index;
                    }
                }
            }

            var all_enabled_wells_count = this.layout.wells.reduce(function(n, well) {
                return n + (!well.disable);
            }, 0);

            if (this.selected_wells.length && this.selected_wells.length === all_enabled_wells_count) {
                this.all_wells_selected = true;
            }
        },
    },
    mounted: function () {
        if (typeof edit_layout_id !== "undefined") {
            this.get_layout(edit_layout_id);
        }
        else {
            for (var i = 0; i < this.layout.size; i++) {
                var content = null;
                this.layout.wells.push({
                    id: i+1,
                    content: {
                        role: '',
                        test_sample: '',
                        ctrl_w_sample: '',
                        ctrl_wo_sample: '',
                        rate: '',
                        condition_set: '',
                        replicate: '',
                    },
                    highlight: false,
                    disable: false,
                });
            }
        }

        var self = this;
        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey || e.metaKey) {
                self.ctrlKeyPressed = true;
            }
            if (e.shiftKey) {
                self.shiftKeyPressed = true;
            }
        });
        document.addEventListener("keyup", function (e) {
            if (!e.ctrlKey && !e.metaKey) {
                self.ctrlKeyPressed = false;
            }
            if (!e.shiftKey) {
                self.shiftKeyPressed = false;
            }
        });
        window.addEventListener('resize', function () {
            self.ctrlKeyPressed = false;
            self.shiftKeyPressed = false;
        });

        document.addEventListener('mousedown', function (e) {
            self.mousedown = true;
            self.mousedown_target = e.target;
        });
        document.addEventListener('mouseup', function () {
            self.mousedown = false;
            self.mousedown_target = null;
            if (self.temp_selection.length) {
                self.temp_selection = self.remove_duplicates(self.temp_selection);
                self.selected_wells.push.apply(self.selected_wells, self.temp_selection);
                self.selected_wells = self.remove_duplicates(self.selected_wells);
            }
            self.temp_selection = [];

            // for (var i = 0; i < self.createMultiplePluginIntervals.length; i++) {
            //     clearInterval(self.createMultiplePluginIntervals[i]);
            // }
        });

        //document.addEventListener('mousemove', this.selection_move_scroll);
    },
    methods: {
        trigger_change_tab: function () {
            this.$nextTick(function () {
                jQuery('.tab-content').trigger('change-tab');
            });
        },
        get_layout: function (id) {
            var layout_data = this.getObjectByKey(layouts, 'id', id);
            this.layout.id = layout_data.id;
            this.layout.name = layout_data.name;
            this.layout.size = layout_data.size;
            this.layout.platform = layout_data.platform;
            this.layout.dispensary = layout_data.dispensary;
            this.$nextTick(function () {
                this.layout.wells = layout_data.wells;
                this.test_samples = layout_data.test_samples;
                this.ctrl_w_samples = layout_data.ctrl_w_samples;
                this.ctrl_wo_samples = layout_data.ctrl_wo_samples;
                this.rates = layout_data.rates;
                this.condition_sets = layout_data.condition_sets;
                this.replicates = layout_data.replicates;
                this.edit_mode = false;
                this.saved_before = true;
            });
            this.active_tab = 'design';
        },
        getObjectByKey: function (array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        getObjectIndexByKey: function (array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return i;
                }
            }
            return null;
        },
        remove_duplicates: function (array) {
            var unique = {};
            array.forEach(function(i) {
              if(!unique[i]) {
                unique[i] = true;
              }
            });
            return Object.keys(unique);
        },
        hexToRgb: function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            result = result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
            return 'rgb(' + result.r + ',' + result.g + ',' + result.b + ')';
        },
        shadeRGBColor: function (color, percent) {
            var f = color.split(","), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = parseInt(f[0].slice(4)), G = parseInt(f[1]), B = parseInt(f[2]);
            return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
        },
        rgb2hex: function (color_value) {
            if (!color_value) return false;
            var parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
                length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
            delete (parts[0]);
            for (var i = 1; i <= length; i++) {
                parts[i] = parseInt(parts[i]).toString(16);
                if (parts[i].length == 1) parts[i] = '0' + parts[i];
            }
            return '#' + parts.join('').toUpperCase();
        },
        ShadeHexColor: function (color, percent) {
            return this.rgb2hex(this.shadeRGBColor(this.hexToRgb(color), percent));
        },
        generate_shades: function (color, count) {
            var shades = [];
            if (count > 1) {
                var step = 1 / (count - 1) * 1.2;
                var shade = -0.6;
                for (var i = 0; i < count; i++) {
                    shades.push(this.ShadeHexColor(color, shade));
                    shade = shade + step;
                }
                return shades;
            }
            return [this.ShadeHexColor(color, -0.6)];
        },
        update_rate_shades: function () {
            // this.rates.sort(function(a, b) {
            //     return parseInt(a.id) - parseInt(b.id);
            // });
            var rate_shades = this.generate_shades('#ff3302', this.rates.length)
            for (var i = 0; i < this.rates.length; i++) {
                this.rates[i].color = rate_shades[i];
            }
        },
        count_placed_treatments: function () {
            var count = 0;
            for (var i = 0; i < this.treatments.length; i++) {
                if (this.treatments[i].place) {
                    count++;
                }
            }
            return count;
        },
        get_column_count: function () {
            if (this.selected_wells.length) {
                // var col_count = 1;
                // for (var i = 0; i < this.selected_wells.length; i++) {
                //     if (i !== this.selected_wells.length - 1) {
                //         if (parseInt(this.selected_wells[i+1]) > parseInt(this.selected_wells[i]) + 1 || i == this.plate_sizes[this.layout.size].columns - 1) {
                //             break;
                //         }
                //         else {
                //             col_count++;
                //         }
                //     }
                // }
                // return col_count;

                var col_count = 0;
                for (var i = 0; i < this.selected_wells.length; i++) {
                    if (i !== this.selected_wells.length - 1) {
                        if (parseInt(this.selected_wells[i]) > this.plate_sizes[this.layout.size].columns) {
                            break;
                        }
                        else {
                            col_count++;
                        }
                    }
                }
                return col_count;
            }
            else {
                return 0;
            }
        },
        get_well_location: function (id) {
            var columns = this.plate_sizes[this.layout.size].columns;
            var letter = this.well_row_letters[Math.floor((parseInt(id)-1)/columns)];
            var number = parseInt(id) - (columns * Math.floor( parseInt(id)/columns ));
            if (!number) {
                number = parseInt(id) / Math.floor( parseInt(id)/columns );
            }
            return {
                row: letter,
                column: number,
            };
        },
        selection_sorted: function (selection) {
            var clone_selection = [].concat(selection);
            return clone_selection.sort(function(a,b){
                return parseInt(a) - parseInt(b);
            });
        },
        selection: function (new_selection) {

            if (this.edit_mode) {
                this.highlight_by = '';
                this.highlight_id = 0;
            }

            var first_item = parseInt(this.selection_sorted(this.selected_wells)[0]);
            var last_item = parseInt(this.selection_sorted(new_selection)[new_selection.length-1]);

            if (last_item < first_item) {
                var first_item = parseInt(this.selection_sorted(new_selection)[new_selection.length-1]);
                var last_item = parseInt(this.selection_sorted(this.selected_wells)[this.selected_wells.length - 1]);
            }

            if (this.shiftKeyPressed) {


                var range = last_item - first_item + 1;
                this.selected_wells = [];
                for (var i = 0; i < range; i++) {
                    var well = this.getObjectByKey(this.layout.wells, 'id', first_item.toString());
                    if (!well.disable) {
                        this.selected_wells.push(first_item.toString());
                    }
                    first_item = parseInt(first_item) + 1;
                }
            }
            else if (this.ctrlKeyPressed) {
                if (this.mousedown) {
                    this.temp_selection.push.apply(this.temp_selection, new_selection);
                }
                else {
                    for (var i = 0; i < new_selection.length; i++) {
                        var existingIndex = this.selected_wells.indexOf(new_selection[i]);
                        if (existingIndex > -1) {
                            this.selected_wells.splice(existingIndex, 1);
                        }
                        else {
                            this.selected_wells.push(new_selection[i]);
                        }
                    }
                }
            }
            else {
                this.selected_wells = new_selection;
            }
        },
        selection_move_scroll: function (e) {
            if (this.mousedown) {

               for (var i = 0; i < this.createMultiplePluginIntervals.length; i++) {
                   clearInterval(this.createMultiplePluginIntervals[i]);
               }

               var mouseX = e.pageX, mouseY = e.pageY;

               var scrollContainer;
               if (jQuery(this.mousedown_target).is('.plate-container, .plate-container *')) {
                   scrollContainer = jQuery('.plate-container');
               }

               if (scrollContainer) {
                   var scrollContainerWidth = scrollContainer.outerWidth();
                   var scrollContainerHeight = scrollContainer.outerHeight();
                   var scrollContainerPosX = scrollContainer.offset().left;
                   var scrollContainerPosXEdge = scrollContainerPosX + scrollContainerWidth;
                   var scrollContainerPosY = scrollContainer.offset().top;
                   var scrollContainerPosYEdge = scrollContainerPosY + scrollContainerHeight;

                   if (mouseX < scrollContainerPosX || mouseX >= scrollContainerPosXEdge) {

                       var scrollDirection, scrollSpeed;
                       if (mouseX < scrollContainerPosX) {
                           scrollDirection = -10;
                           scrollSpeed = Math.floor(1/Math.abs(mouseX) * 200);
                       }
                       else if (mouseX >= scrollContainerPosXEdge) {
                           scrollDirection = 10;
                           scrollSpeed = Math.floor(1/(mouseX - scrollContainerPosXEdge) * 200);
                       }

                       this.createMultiplePluginIntervals.push(
                           this.createModalScrollInterval = setInterval(function () {
                               var currentScrollLeft = scrollContainer.scrollLeft();
                               scrollContainer.scrollLeft(currentScrollLeft + scrollDirection);
                           }, scrollSpeed)
                       );
                   }
                   else if (mouseY < scrollContainerPosY || mouseY >= scrollContainerPosYEdge) {

                       var scrollDirection, scrollSpeed;
                       if (mouseY < scrollContainerPosY) {
                           scrollDirection = -10;
                           scrollSpeed = Math.floor(1/Math.abs(mouseY) * 200);
                       }
                       else if (mouseY >= scrollContainerPosYEdge) {
                           scrollDirection = 10;
                           scrollSpeed = Math.floor(1/(mouseY - scrollContainerPosYEdge) * 200);
                       }

                       this.createMultiplePluginIntervals.push(
                           this.createModalScrollInterval = setInterval(function () {
                               var currentScrollTop = scrollContainer.scrollTop();
                               scrollContainer.scrollTop(currentScrollTop + scrollDirection);
                           }, scrollSpeed)
                       );
                   }
                   else {
                       for (var i = 0; i < this.createMultiplePluginIntervals.length; i++) {
                           clearInterval(this.createMultiplePluginIntervals[i]);
                       }
                   }
               }
           }
       },
       check_selection: function () {
            this.reset_highlight();
            for (var i = 0; i < this.layout.wells.length; i++) {
                var well = this.layout.wells[i];
                if (
                    this.layout_mode === 'test_samples' && (!well.content.role || well.content.role !== 'test_sample')
                    ||
                    this.layout_mode === 'ctrl_w_samples' && (!well.content.role || well.content.role !== 'ctrl_w_sample')
                    ||
                    this.layout_mode === 'ctrl_wo_samples' && (!well.content.role || well.content.role !== 'ctrl_wo_sample')
                    ||
                    this.layout_mode === 'rates' && (!well.content.role || well.content.role === 'empty' || well.content.role === 'ctrl_wo_sample')
                    ||
                    this.layout_mode === 'condition_sets' && (!well.content.role || well.content.role === 'empty')
                    ||
                    this.layout_mode === 'replicates' && (!well.content.role || well.content.role === 'empty')
                ) {
                    well.disable = true;
                }
                else {
                    well.disable = false;
                }
            }
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well_role = this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]).content.role;
                if (
                    this.layout_mode === 'test_samples' && (!well_role || well_role !== 'test_sample')
                    ||
                    this.layout_mode === 'ctrl_w_samples' && (!well_role || well_role !== 'ctrl_w_sample')
                    ||
                    this.layout_mode === 'ctrl_wo_samples' && (!well_role || well_role !== 'ctrl_wo_sample')
                    ||
                    this.layout_mode === 'rates' && (!well_role || well_role === 'empty' || well_role === 'ctrl_wo_sample')
                    ||
                    this.layout_mode === 'condition_sets' && (!well_role || well_role === 'empty')
                    ||
                    this.layout_mode === 'replicates' && (!well_role || well_role === 'empty')
                ) {
                    this.selected_wells.splice(i, 1);
                    i--;
                }
            }
        },
        add_update_content: function (well_id, type, value) {
            var plural = type + 's';
            if (!this.getObjectByKey(this[plural], 'id', value)) {
                var color = this[type + '_color_palatte'][this[type + '_color_index']]
                if (type === 'rate') {
                    color = '';
                }
                this[plural].push({
                    id: value,
                    color: color,
                });
                if (this[type + '_color_index'] == this[type + '_color_palatte'].length - 1) {
                    this[type + '_color_index'] = 0;
                }
                else {
                    this[type + '_color_index']++;
                }
            }
            this.getObjectByKey(this.layout.wells, 'id', well_id).content[type] = value;
        },
        set: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                if (this.layout_mode === 'roles') {
                    var well = this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]);
                    well.content.role = this.role_value;

                    if (this.role_value === 'test_sample') {
                        well.content.ctrl_w_sample = '';
                        well.content.ctrl_wo_sample = '';
                    }
                    else if (this.role_value === 'ctrl_w_sample') {
                        well.content.test_sample = '';
                        well.content.ctrl_wo_sample = '';
                    }
                    else if (this.role_value === 'ctrl_wo_sample') {
                        well.content.test_sample = '';
                        well.content.ctrl_w_sample = '';
                        well.content.rate = '';
                    }
                    else if (this.role_value === 'empty') {
                        well.content.test_sample = '';
                        well.content.ctrl_w_sample = '';
                        well.content.ctrl_wo_sample = '';
                        well.content.rate = '';
                        well.content.condition_set = '';
                        well.content.replicate = '';
                    }
                }
                else if (this.layout_mode === 'test_samples') {
                    this.add_update_content(this.selected_wells[i], 'test_sample', this.test_sample_value);
                }
                else if (this.layout_mode === 'ctrl_w_samples') {
                    this.add_update_content(this.selected_wells[i], 'ctrl_w_sample', this.ctrl_w_sample_value);
                }
                else if (this.layout_mode === 'ctrl_wo_samples') {
                    this.add_update_content(this.selected_wells[i], 'ctrl_wo_sample', this.ctrl_wo_sample_value);
                }
                else if (this.layout_mode === 'rates') {
                    this.add_update_content(this.selected_wells[i], 'rate', this.rate_value);
                }
                else if (this.layout_mode === 'condition_sets') {
                    this.add_update_content(this.selected_wells[i], 'condition_set', this.condition_set_value);
                }
                else if (this.layout_mode === 'replicates') {
                    this.add_update_content(this.selected_wells[i], 'replicate', this.replicate_value);
                }
            }
            this.$nextTick(function () {
                if (this.rates.length) {
                    this.update_rate_shades();
                }
                this.selected_wells = [];
                this.reset_highlight();
            });
        },
        unset: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well = this.getObjectByKey(this.layout.wells, 'id', this.selected_wells[i]);
                if (this.layout_mode === 'roles') {
                    well.content = {
                        role: '',
                        test_sample: '',
                        ctrl_w_sample: '',
                        ctrl_wo_sample: '',
                        rate: '',
                        condition_set: '',
                        replicate: '',
                    };
                }
                else if (this.layout_mode === 'test_samples') {
                    well.content.test_sample = '';
                }
                else if (this.layout_mode === 'ctrl_w_samples') {
                    well.content.ctrl_w_sample = '';
                }
                else if (this.layout_mode === 'ctrl_wo_samples') {
                    well.content.ctrl_wo_sample = '';
                }
                else if (this.layout_mode === 'rates') {
                    well.content.rate = '';
                }
                else if (this.layout_mode === 'condition_sets') {
                    well.content.condition_set = '';
                }
                else if (this.layout_mode === 'replicates') {
                    well.content.replicate = '';
                }
            }
            this.$nextTick(function () {
                if (this.layout_mode === 'rates' && this.rates.length) {
                    this.update_rate_shades();
                }
                this.selected_wells = [];
                this.reset_highlight();
            });
        },
        well_mouseover: function (id) {
            var columns = this.plate_sizes[this.layout.size].columns;
            var row_index = Math.floor((parseInt(id)-1)/columns);
            var column_index = parseInt(id) - (columns * Math.floor( parseInt(id)/columns )) - 1;
            if (column_index < 0) {
                column_index = parseInt(id) / Math.floor( parseInt(id)/columns ) - 1;
            }
            jQuery('.plate-columns .plate-column').eq(column_index).addClass('hover');
            jQuery('.plate-rows .plate-row').eq(row_index).addClass('hover');
        },
        well_mouseout: function (id) {
            jQuery('.plate-columns .plate-column').removeClass('hover');
            jQuery('.plate-rows .plate-row').removeClass('hover');
        },
        place_series: function (array) {
            for (var i = 0; i < this.selected_treatments.length; i++) {
                var already_placed = this.getObjectByKey(app.plates[this.current_plate_index].wells, 'content', this.selected_treatments[i]);
                if (already_placed) {
                    already_placed.content = null;
                }
                this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', array[i]).content = this.selected_treatments[i];
                this.getObjectByKey(this.treatments, 'id', this.selected_treatments[i]).place = { plate_id: this.plates[this.current_plate_index].id, well_id: array[i] };
            }
            this.selected_treatments = [];
            this.selected_wells = [];
            this.reset_highlight();
        },
        place_across: function () {
            this.place_series(this.selected_wells);
        },
        place_down: function () {
            var column_count = this.get_column_count();
            var row_count = this.selected_wells.length / columns;
            var columns = [];
            for (var i = 0; i < column_count; i++) {
                columns.push([]);
            }
            var column_index = 0;
            for (var i = 0; i < this.selected_wells.length; i++) {
                columns[column_index].push(this.selected_wells[i]);
                if (column_index === column_count - 1) {
                    column_index = 0;
                }
                else {
                    column_index++;
                }
            }
            var down_array = [].concat.apply([], columns);

            this.place_series(down_array);
        },
        open_auto_set: function () {
            if (this.layout_mode === 'test_samples') {
                this.auto_set_data.starting_number = this.test_sample_value;
            }
            else if (this.layout_mode === 'ctrl_w_samples') {
                this.auto_set_data.starting_number = this.ctrl_w_sample_value;
            }
            else if (this.layout_mode === 'ctrl_wo_samples') {
                this.auto_set_data.starting_number = this.ctrl_wo_sample_value;
            }
            else if (this.layout_mode === 'rates') {
                this.auto_set_data.starting_number = this.rate_value;
            }
            else if (this.layout_mode === 'condition_sets') {
                this.auto_set_data.starting_number = this.condition_set_value;
            }
            else if (this.layout_mode === 'replicates') {
                this.auto_set_data.starting_number = this.replicate_value;
            }
        },
        auto_set_series: function (array, chunks) {
            var content_type = '';
            if (this.layout_mode === 'test_samples') {
                content_type = 'test_sample';
            }
            else if (this.layout_mode === 'ctrl_w_samples') {
                content_type = 'ctrl_w_sample';
            }
            else if (this.layout_mode === 'ctrl_wo_samples') {
                content_type = 'ctrl_wo_sample';
            }
            else if (this.layout_mode === 'rates') {
                content_type = 'rate';
            }
            if (this.layout_mode === 'condition_sets') {
                content_type = 'condition_set';
            }
            if (this.layout_mode === 'replicates') {
                content_type = 'replicate';
            }
            var starting_number = this.auto_set_data.starting_number;
            if (chunks) {
                for (var i = 0; i < array.length; i++) {
                    for (var j = 0; j < array[i].length; j++) {
                        this.add_update_content(array[i][j], content_type, starting_number);
                    }
                    starting_number++;
                }
            }
            else {
                for (var i = 0; i < array.length; i++) {
                    this.add_update_content(array[i], content_type, starting_number);
                    starting_number++;
                }
            }
            this.$nextTick(function () {
                if (this.layout_mode === 'rates' && this.rates.length) {
                    this.update_rate_shades();
                }
                this.selected_wells = [];
                this.reset_highlight();
            });
        },
        auto_set_columns: function () {
            var down_array = [];
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well_location = this.get_well_location(this.selected_wells[i]);
                down_array.push({
                    id: this.selected_wells[i],
                    column: well_location.column,
                });
            }

            down_array.sort(function (a, b) {
                var aA = parseInt(a.column, 10);
                var bA = parseInt(b.column, 10);
                if (aA === bA) {
                    var aN = a.column;
                    var bN = b.column
                    return aN === bN ? 0 : aN > bN ? 1 : -1;
                }
                return aA > bA ? 1 : -1;
            });

            var result_down_array = [];

            var current_column, current_index = -1;

            for (var i = 0; i < down_array.length; i++) {

                if (down_array[i].column !== current_column) {
                    current_column = down_array[i].column;
                    current_index++;
                    result_down_array[current_index] = [down_array[i].id];
                }
                else {
                    result_down_array[current_index].push(down_array[i].id);
                }
            }

            this.auto_set_series(result_down_array, true);
        },
        auto_set_rows: function () {
            var across_array = [];
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well_location = this.get_well_location(this.selected_wells[i]);
                across_array.push({
                    id: this.selected_wells[i],
                    row: well_location.row,
                });
            }

            across_array.sort(function (a, b) {
                var aA = a.row;
                var bA = b.row;
                if (aA === bA) {
                    var aN = a.row;
                    var bN = b.row
                    return aN === bN ? 0 : aN > bN ? 1 : -1;
                }
                return aA > bA ? 1 : -1;
            });

            var result_across_array = [];

            var current_row, current_index = -1;

            for (var i = 0; i < across_array.length; i++) {

                if (across_array[i].row !== current_row) {
                    current_row = across_array[i].row;
                    current_index++;
                    result_across_array[current_index] = [across_array[i].id];
                }
                else {
                    result_across_array[current_index].push(across_array[i].id);
                }
            }

            this.auto_set_series(result_across_array, true);
        },
        auto_set_across: function () {
            this.auto_set_series(this.selected_wells);
        },
        auto_set_down: function () {
            var down_array = [];
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well_location = this.get_well_location(this.selected_wells[i]);
                down_array.push({
                    id: this.selected_wells[i],
                    location: well_location.column + '' + well_location.row,
                });
            }

            var reA = /[^0-9]/g;
            var reN = /[^a-zA-Z]/g;

            down_array.sort(function (a, b) {
                var aA = parseInt(a.location.replace(reA, ""), 10);
                var bA = parseInt(b.location.replace(reA, ""), 10);
                if (aA === bA) {
                    var aN = a.location.replace(reN, "");
                    var bN = b.location.replace(reN, "");
                    return aN === bN ? 0 : aN > bN ? 1 : -1;
                }
                return aA > bA ? 1 : -1;
            });

            var result_down_array = [];

            for (var i = 0; i < down_array.length; i++) {
                result_down_array.push(down_array[i].id);
            }

            this.auto_set_series(result_down_array);
        },
        submit_auto_set: function () {

            this.selected_wells = this.selection_sorted(this.selected_wells);

            if (this.auto_set_data.mode === 'columns') {
                this.auto_set_columns();
            }
            else if (this.auto_set_data.mode === 'rows') {
                this.auto_set_rows();
            }
            else if (this.auto_set_data.mode === 'wells') {
                if (this.auto_set_data.direction === 'across') {
                    this.auto_set_across();
                }
                else if (this.auto_set_data.direction === 'down') {
                    this.auto_set_down();
                }
            }

            Figure.modal('.auto_set_modal').hide();
        },
        close_auto_set: function () {
            this.auto_set_data.mode = 'rows';
            this.auto_set_data.starting_number = 1;
            this.auto_set_data.direction = 'across';
        },
        set_as_blank: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', this.selected_wells[i]);
                var treatment = this.getObjectByKey(this.treatments, 'id', well.content);
                if (treatment) {
                    treatment.place = null;
                }
                well.content = 'blank';
            }
            this.selected_wells = [];
            this.reset_highlight();
        },
        unplace_treatments: function () {
            for (var i = 0; i < this.selected_treatments.length; i++) {
                var treatment = this.getObjectByKey(this.treatments, 'id', this.selected_treatments[i]);
                if (treatment.place) {
                    var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', treatment.place.well_id);
                    if (well) {
                        well.content = null;
                    }
                    treatment.place = null;
                }
            }
            this.selected_treatments = [];
        },
        unplace_wells: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', this.selected_wells[i]);
                if (well.content) {
                    var treatment = this.getObjectByKey(this.treatments, 'id', well.content);
                    if (treatment) {
                        treatment.place = null;
                    }
                    well.content = null;
                }
            }
            this.selected_wells = [];
            this.reset_highlight();
        },
        clear_plate: function () {
            for (var i = 0; i < this.layout.wells.length; i++) {
                this.layout.wells[i].content = {
                    role: '',
                    test_sample: '',
                    ctrl_w_sample: '',
                    ctrl_wo_sample: '',
                    rate: '',
                    condition_set: '',
                    replicate: '',
                };
                this.layout.wells[i].highlight = false;
                this.layout.wells[i].disable = false;
            }
            this.layout_mode = 'roles';
            this.selected_wells = [];
            this.test_samples = [];
            this.ctrl_w_samples = [];
            this.ctrl_wo_samples = [];
            this.rates = [];
            this.condition_sets = [];
            this.replicates = [];
            this.role_value = 'test_sample';
            this.test_sample_value = 1;
            this.ctrl_w_sample_value = 1;
            this.ctrl_wo_sample_value = 1;
            this.rate_value = 1;
            this.condition_set_value = 1;
            this.replicate_value = 1;
            this.current_sample_shade = -0.8;
            this.current_rate_shade = -0.8;
            this.test_sample_color_index = 0;
            this.ctrl_w_sample_color_index = 0;
            this.ctrl_wo_sample_color_index = 0;
            this.rate_color_index = 0;
            this.condition_set_color_index = 0;
            this.replicate_color_index = 0;
            this.highlight_by = '';
            this.highlight_id = 0;
        },
        clear_filters: function () {
            var filters = this.filters;
            for (var key of Object.keys(filters)) {
                this.$set(this.filters, key, 'all');
            }
        },
        count_wells_by: function (type, id) {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content[type] == id);
            }, 0);
        },
        render_tooltip_content: function (well_id) {
            var well_content = this.getObjectByKey(this.layout.wells, 'id', well_id).content;
            var role = well_content.role;
            var test_sample = well_content.test_sample;
            var ctrl_w_sample = well_content.ctrl_w_sample;
            var ctrl_wo_sample = well_content.ctrl_wo_sample;
            var rate = well_content.rate;
            var condition_set = well_content.condition_set;
            var replicate = well_content.replicate;

            var role_and_number;

            if (!role) {
                role_and_number = `<li><strong class='label'>Role:</strong>Unset</li>`;
            }
            else if (role === 'empty') {
                role_and_number = `<li><strong class='label'>Role:</strong>Empty</li>`;
            }
            else if (role === 'test_sample') {
                role_and_number = `
                <li>
                    <strong class='label'>Role:</strong>
                    <span class='color-key'><span class='circle' style='background-color: ` + this.role_colors['test_sample'] + `'></span>Test Sample</span>
                </li>
                <li><strong class='label'>Test Sample #:</strong> ` + (test_sample ? test_sample : `<span class='fi-text-danger'>Not set</span>`) + `</li>
                `;
            }
            else if (role === 'ctrl_w_sample') {
                role_and_number = `
                <li>
                    <strong class='label'>Role:</strong>
                    <span class='color-key'><span class='circle' style='background-color: ` + this.role_colors['ctrl_w_sample'] + `'></span>Control with Sample</span>
                </li>
                <li><strong class='label'>Control with Sample #:</strong> ` + (ctrl_w_sample ? ctrl_w_sample : `<span class='fi-text-danger'>Not set</span>`) + `</li>
                `;
            }
            else if (role === 'ctrl_wo_sample') {
                role_and_number = `
                <li>
                    <strong class='label'>Role:</strong>
                    <span class='color-key'><span class='circle' style='background-color: ` + this.role_colors['ctrl_wo_sample'] + `'></span>Control without Sample</span>
                </li>
                <li><strong class='label'>Control without Sample #:</strong> ` + (ctrl_wo_sample ? ctrl_wo_sample : `<span class='fi-text-danger'>Not set</span>`) + `</li>
                `;
            }

            if (!rate) {
                rate = "<span class='fi-text-danger'>Not set</span>";
            }
            if (!condition_set) {
                condition_set = "<span class='fi-text-danger'>Not set</span>";
            }
            if (!replicate) {
                replicate = "<span class='fi-text-danger'>Not set</span>";
            }

            var well_location = this.get_well_location(well_id);

            return `
            <ul class='fi-list well-info-content'>
                <li><strong class='label'>Location:</strong> ` + well_location.row + `-` + well_location.column + `</li>
                ` + role_and_number + `
                ` + ( well_content.role === 'test_sample' || well_content.role === 'ctrl_w_sample' ? `
                <li><strong class='label'>Rate #:</strong> ` + rate + `</li>
                ` : `` ) + `
                ` + ( well_content.role !== 'empty' ? `
                <li><strong class='label'>Condition Set #:</strong> ` + condition_set + `</li>
                ` : `` ) + `
                ` + ( well_content.role !== 'empty' ? `
                <li><strong class='label'>Replicate #:</strong> ` + replicate + `</li>
                ` : `` ) + `
            </ul>
            `;
        },
        tooltip_class: function (well_id) {
            var well = this.getObjectByKey(this.layout.wells, 'id', well_id);
            if (
                well.content.role === 'test_sample' && well.content.test_sample && well.content.rate && well.content.condition_set && well.content.replicate
                ||
                well.content.role === 'ctrl_w_sample' && well.content.ctrl_w_sample && well.content.rate && well.content.condition_set && well.content.replicate
                ||
                well.content.role === 'ctrl_wo_sample' && well.content.ctrl_wo_sample && well.content.condition_set && well.content.replicate
                ||
                well.content.role === 'empty'
            ) {
                return 'complete';
            }
            else {
                return 'not-complete';
            }
        },
        highlight: function(type, id) {
            if (!id) {
                id = 0;
            }
            this.selected_wells = [];
            if (this.highlight_by == type && this.highlight_id == id) {
                if (this.edit_mode) {
                    this.reset_highlight();
                }
                else {
                    this.reset_highlight();
                    for (var i = 0; i < this.layout.wells.length; i++) {
                        this.layout.wells[i].highlight = false;
                    }
                }
            }
            else {
                this.reset_highlight();

                if (!this.edit_mode) {
                    for (var i = 0; i < this.layout.wells.length; i++) {
                        this.layout.wells[i].highlight = false;
                    }
                }

                for (var i = 0; i < this.layout.wells.length; i++) {
                    var well = this.layout.wells[i];
                    if (type === 'role_not_set' && this.unset_count) {
                        if (!well.content.role) {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'empty' && this.empty_count) {
                        if (well.content.role === 'empty') {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'role_test_sample' && this.test_sample_count) {
                        if (well.content.role === 'test_sample') {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'role_ctrl_w_sample' && this.ctrl_w_sample_count) {
                        if (well.content.role === 'ctrl_w_sample') {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'role_ctrl_wo_sample' && this.ctrl_wo_sample_count) {
                        if (well.content.role === 'ctrl_wo_sample') {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'test_sample_not_set' && this.test_sample_not_set_count) {
                        if (!well.content.test_sample && well.content.role === 'test_sample') {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'ctrl_w_sample_not_set' && this.ctrl_w_sample_not_set_count) {
                        if (!well.content.ctrl_w_sample && well.content.role === 'ctrl_w_sample') {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'ctrl_wo_sample_not_set' && this.ctrl_wo_sample_not_set_count) {
                        if (!well.content.ctrl_wo_sample && well.content.role === 'ctrl_wo_sample') {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'test_sample' && id) {
                        if (well.content.test_sample == id) {
                            this.highlight_by = type;
                            this.highlight_id = id;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'ctrl_w_sample' && id) {
                        if (well.content.ctrl_w_sample == id) {
                            this.highlight_by = type;
                            this.highlight_id = id;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'ctrl_wo_sample' && id) {
                        if (well.content.ctrl_wo_sample == id) {
                            this.highlight_by = type;
                            this.highlight_id = id;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'rate_not_set' && this.rate_not_set_count) {
                        if (!well.content.rate && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample')) {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'rate' && id) {
                        if (well.content.rate == id) {
                            this.highlight_by = type;
                            this.highlight_id = id;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'condition_set_not_set' && this.condition_set_not_set_count) {
                        if (!well.content.condition_set && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample')) {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'condition_set' && id) {
                        if (well.content.condition_set == id) {
                            this.highlight_by = type;
                            this.highlight_id = id;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'replicate_not_set' && this.replicate_not_set_count) {
                        if (!well.content.replicate && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample')) {
                            this.highlight_by = type;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                    else if (type === 'replicate' && id) {
                        if (well.content.replicate == id) {
                            this.highlight_by = type;
                            this.highlight_id = id;
                            if (this.edit_mode) {
                                if (!well.disable) {
                                    this.selected_wells.push(well.id.toString());
                                }
                            }
                            else {
                                well.highlight = true;
                            }
                        }
                    }
                }
                if (this.edit_mode && !this.selected_wells.length) {
                    this.reset_highlight();
                }
            }
        },
        reset_highlight: function () {
            this.highlight_by = '';
            this.highlight_id = 0;
        },
        reset_highlight_click_outside: function () {
            if (!this.edit_mode && !jQuery(event.target).is('.color-key-button') && !jQuery(event.target).closest('.color-key-button').length) {
                this.reset_highlight();
                for (var i = 0; i < this.layout.wells.length; i++) {
                    this.layout.wells[i].highlight = false;
                }
            }
        },
        select_deselect_column: function (index) {

            if (this.edit_mode) {

                this.selected_wells = [];
                this.reset_highlight();

                if (this.last_col_index != index) {
                    var columns = this.plate_sizes[this.layout.size].columns;
                    var rows = this.plate_sizes[this.layout.size].rows;

                    var id = index + 1;

                    var well_ids = [id.toString()];

                    for (var i = 0; i < rows - 1; i++) {
                        id = parseInt(id) + columns;
                        well_ids.push(id.toString());
                    }

                    for (var i = 0; i < well_ids.length; i++) {
                        var well = this.getObjectByKey(this.layout.wells, 'id', well_ids[i]);
                        if (!well.disable) {
                            this.selected_wells.push(well_ids[i]);
                        }
                    }
                }

            }

        },
        select_deselect_row: function (index) {

            if (this.edit_mode) {

                this.selected_wells = [];
                this.reset_highlight();

                if (this.last_row_index != index) {
                    var columns = this.plate_sizes[this.layout.size].columns;
                    var rows = this.plate_sizes[this.layout.size].rows;

                    var id = columns * (index + 1) - columns + 1;

                    var well_ids = [id.toString()];

                    for (var i = 0; i < columns - 1; i++) {
                        id = parseInt(id) + 1;
                        well_ids.push(id.toString());
                    }

                    for (var i = 0; i < well_ids.length; i++) {
                        var well = this.getObjectByKey(this.layout.wells, 'id', well_ids[i]);
                        if (!well.disable) {
                            this.selected_wells.push(well_ids[i]);
                        }
                    }
                }

            }

        },
        select_deselect_all: function () {
            if (this.edit_mode) {

                this.reset_highlight();

                var all_enabled_wells_count = this.layout.wells.reduce(function(n, well) {
                    return n + (!well.disable);
                }, 0);
                if (this.selected_wells.length !== all_enabled_wells_count) {
                    this.selected_wells = [];
                    for (var i = 0; i < this.layout.wells.length; i++) {
                        if (!this.layout.wells[i].disable) {
                            this.selected_wells.push(this.layout.wells[i].id.toString());
                        }
                    }
                }
                else {
                    this.selected_wells = [];
                }

            }
        },
        save_layout: function () {
            if (!this.layout.name || !this.layout.platform || !this.layout.dispensary || this.layout.size - this.count_placed_wells) {
                var error_message = `
                <p>Please resolve the following error(s):</p>
                <ul>
                `;
                if (!this.layout.name) {
                    error_message += `<li><strong>Name</strong> is empty.</li>`;
                }
                if (!this.layout.platform) {
                    error_message += `<li><strong>Platform</strong> is empty.</li>`;
                }
                if (!this.layout.dispensary) {
                    error_message += `<li><strong>Dispensary</strong> is empty.</li>`;
                }
                if (this.layout.size - this.count_placed_wells) {
                    error_message += `
                    <li>
                        <p>There are wells that are <strong>unset</strong> or <strong>incomplete</strong>.</p>
                        <p>Unneeded wells can be set to empty. Otherwise, please make sure the following rules are met:</p>
                        <ul>
                            <li>Test Samples and Controls with Samples must have Sample #s and Rates #s</li>
                            <li>Controls without Samples must have Sample #s</li>
                            <li>All wells (except for empty ones) must have Condition Set #s and Replicate #s</li>
                        </ul>
                    </li>
                    `;
                }
                Figure.dialog({
                    title: `<i class="far fa-exclamation-triangle fi-icon-margin fi-text-danger"></i>Can't Save Layout`,
                    message: error_message,
                    okText: 'OK',
                });
            }
            else {
                this.selected_wells = [];
                this.reset_highlight();
                this.edit_mode = false;
                this.saved_before = true;
                Figure.notify('<div class="notify-content"><i class="notify-icon fa fa-check-circle fi-text-success"></i> Layout saved successfully</div>');
            }
        },
    },
    computed: {
        layout_size: function () {
            return this.layout.size;
        },
        tooltip_offset: function () {
            if (this.layout.size >= 384) {
                return -4
            }
            else {
                return -8;
            }
        },
        sorted_test_samples: function () {
            return this.test_samples.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        sorted_ctrl_w_samples: function () {
            return this.ctrl_w_samples.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        sorted_ctrl_wo_samples: function () {
            return this.ctrl_wo_samples.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        sorted_rates: function () {
            return this.rates.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        sorted_condition_sets: function () {
            return this.condition_sets.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        sorted_replicates: function () {
            return this.replicates.sort(function(a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });
        },
        count_placed_wells: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (
                    well.content.role === 'test_sample' && well.content.test_sample !== '' && well.content.rate !== '' && well.content.condition_set !== '' && well.content.replicate !== ''
                    ||
                    well.content.role === 'ctrl_w_sample' && well.content.ctrl_w_sample !== '' && well.content.rate !== '' && well.content.condition_set !== '' && well.content.replicate !== ''
                    ||
                    well.content.role === 'ctrl_wo_sample' && well.content.ctrl_wo_sample !== '' && well.content.condition_set !== '' && well.content.replicate !== ''
                    ||
                    well.content.role === 'empty'
                );
            }, 0);
        },
        unset_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.role);
            }, 0);
        },
        empty_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.role === 'empty');
            }, 0);
        },
        test_sample_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.role === 'test_sample');
            }, 0);
        },
        ctrl_w_sample_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.role === 'ctrl_w_sample');
            }, 0);
        },
        ctrl_wo_sample_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (well.content.role === 'ctrl_wo_sample');
            }, 0);
        },
        test_sample_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.test_sample && well.content.role === 'test_sample');
            }, 0);
        },
        ctrl_w_sample_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.ctrl_w_sample && well.content.role === 'ctrl_w_sample');
            }, 0);
        },
        ctrl_wo_sample_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.ctrl_wo_sample && well.content.role === 'ctrl_wo_sample');
            }, 0);
        },
        rate_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.rate && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample'));
            }, 0);
        },
        condition_set_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.condition_set && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample'));
            }, 0);
        },
        replicate_not_set_count: function () {
            return this.layout.wells.reduce(function(n, well) {
                return n + (!well.content.replicate && (well.content.role === 'test_sample' || well.content.role === 'ctrl_w_sample' || well.content.role === 'ctrl_wo_sample'));
            }, 0);
        },
    },
});

jQuery(document).on('mousedown', function (e) {
    if (jQuery(e.target).is('.plate-container .drag-select-container, .plate-top-bar, .plate-corner, .plate-columns, .plate-rows, .well.disabled')) {
        create_app.selected_wells = [];
        if (create_app.edit_mode) {
            create_app.reset_highlight();
        }
    }
});

jQuery(document).on('fi-modal:hidden', '.auto_set_modal', function () {
    create_app.close_auto_set();
});

jQuery(document).on('fi-modal:hidden', '.create-modal', function () {
    create_app.selected_wells = [];
    create_app.reset_highlight();
    create_app.active_tab = 'design';
});
