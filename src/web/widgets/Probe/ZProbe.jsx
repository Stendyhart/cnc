import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Modal from 'web/components/Modal';
import ToggleSwitch from 'web/components/ToggleSwitch';
import i18n from 'web/lib/i18n';

class ZProbe extends PureComponent {
    static propTypes = {
        state: PropTypes.object,
        actions: PropTypes.object
    };

    render() {
        const { state, actions } = this.props;
        const { useTLO } = state;
        const probeCommands = actions.populateProbeCommands();
        const content = probeCommands.join('\n');

        return (
            <Modal disableOverlay size="sm" onClose={actions.closeModal}>
                <Modal.Header>
                    <Modal.Title>{i18n._('Z-Probe')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ marginBottom: 10 }}>
                        <ToggleSwitch
                            checked={useTLO}
                            size="sm"
                            onChange={actions.toggleUseTLO}
                        />
                        {i18n._('Apply tool length offset')}
                    </div>
                    <pre style={{ minHeight: 240 }}>
                        <code>{content}</code>
                    </pre>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={actions.closeModal}
                    >
                        {i18n._('Cancel')}
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            actions.closeModal();
                            actions.runProbeCommands(probeCommands);
                        }}
                    >
                        {i18n._('Run Z-Probe')}
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ZProbe;
